import { Router } from 'express'
import { query } from '../lib/db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

/* GET /api/billing?status=paid|unpaid */
router.get('/', async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query
  const offset = (page - 1) * limit
  const params = []
  let where = ''
  if (status) { params.push(status); where = `WHERE status = $1` }
  params.push(limit, offset)

  try {
    const { rows } = await query(
      `SELECT b.*, c.name AS customer_name
       FROM bills b
       LEFT JOIN customers c ON b.customer_id = c.id
       ${where} ORDER BY b.created_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    )
    const count = await query(`SELECT COUNT(*) FROM bills ${where}`, params.slice(0, -2))
    res.json({ data: rows, total: parseInt(count.rows[0].count), page: +page, limit: +limit })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* GET /api/billing/summary — paid/unpaid totals */
router.get('/summary', async (_req, res) => {
  try {
    const { rows } = await query(
      `SELECT status, COUNT(*) AS count, COALESCE(SUM(amount),0) AS total
       FROM bills GROUP BY status`
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* GET /api/billing/:id */
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT b.*, c.name AS customer_name FROM bills b
       LEFT JOIN customers c ON b.customer_id = c.id WHERE b.id=$1`,
      [req.params.id]
    )
    if (!rows.length) return res.status(404).json({ error: 'Bill not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* POST /api/billing */
router.post('/', async (req, res) => {
  const { customer_id, items, amount, due_date, notes } = req.body
  if (!customer_id || !amount) return res.status(400).json({ error: 'customer_id and amount required' })
  try {
    const { rows } = await query(
      `INSERT INTO bills (customer_id, items, amount, status, due_date, notes, created_at)
       VALUES ($1,$2,$3,'unpaid',$4,$5,NOW()) RETURNING *`,
      [customer_id, JSON.stringify(items || []), amount, due_date, notes]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* PATCH /api/billing/:id/pay */
router.patch('/:id/pay', async (req, res) => {
  try {
    const { rows } = await query(
      `UPDATE bills SET status='paid', paid_at=NOW(), updated_at=NOW()
       WHERE id=$1 RETURNING *`,
      [req.params.id]
    )
    if (!rows.length) return res.status(404).json({ error: 'Bill not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* DELETE /api/billing/:id */
router.delete('/:id', async (req, res) => {
  try {
    await query('DELETE FROM bills WHERE id=$1', [req.params.id])
    res.json({ message: 'Bill deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
