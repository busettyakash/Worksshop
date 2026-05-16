import { Router } from 'express'
import { query } from '../lib/db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

/* GET /api/customers */
router.get('/', async (req, res) => {
  const { page = 1, limit = 20, search } = req.query
  const offset = (page - 1) * limit
  const params = []
  let where = ''
  if (search) { params.push(`%${search}%`); where = `WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1` }
  params.push(limit, offset)
  try {
    const { rows } = await query(
      `SELECT * FROM customers ${where} ORDER BY created_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    )
    const count = await query(`SELECT COUNT(*) FROM customers ${where}`, params.slice(0, -2))
    res.json({ data: rows, total: parseInt(count.rows[0].count) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* GET /api/customers/:id */
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM customers WHERE id=$1', [req.params.id])
    if (!rows.length) return res.status(404).json({ error: 'Customer not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* POST /api/customers */
router.post('/', async (req, res) => {
  const { name, email, phone, address, gst_number } = req.body
  if (!name) return res.status(400).json({ error: 'name is required' })
  try {
    const { rows } = await query(
      `INSERT INTO customers (name, email, phone, address, gst_number, created_at)
       VALUES ($1,$2,$3,$4,$5,NOW()) RETURNING *`,
      [name, email, phone, address, gst_number]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* PUT /api/customers/:id */
router.put('/:id', async (req, res) => {
  const { name, email, phone, address, gst_number } = req.body
  try {
    const { rows } = await query(
      `UPDATE customers SET name=$1,email=$2,phone=$3,address=$4,gst_number=$5,updated_at=NOW()
       WHERE id=$6 RETURNING *`,
      [name, email, phone, address, gst_number, req.params.id]
    )
    if (!rows.length) return res.status(404).json({ error: 'Customer not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* DELETE /api/customers/:id */
router.delete('/:id', async (req, res) => {
  try {
    await query('DELETE FROM customers WHERE id=$1', [req.params.id])
    res.json({ message: 'Customer deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
