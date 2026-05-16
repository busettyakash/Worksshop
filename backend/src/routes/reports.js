import { Router } from 'express'
import { query } from '../lib/db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

/* GET /api/reports/sales — daily sales summary */
router.get('/sales', async (req, res) => {
  const { from, to } = req.query
  const start = from || new Date(Date.now() - 30 * 86400000).toISOString()
  const end   = to   || new Date().toISOString()
  try {
    const { rows } = await query(
      `SELECT DATE(created_at) AS date,
              COUNT(*) AS order_count,
              COALESCE(SUM(amount),0) AS total_revenue
       FROM bills
       WHERE status='paid' AND created_at BETWEEN $1 AND $2
       GROUP BY DATE(created_at) ORDER BY date ASC`,
      [start, end]
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* GET /api/reports/dashboard — KPI summary */
router.get('/dashboard', async (_req, res) => {
  try {
    const [sales, products, customers, unpaid] = await Promise.all([
      query(`SELECT COALESCE(SUM(amount),0) AS today FROM bills WHERE status='paid' AND DATE(created_at)=CURRENT_DATE`),
      query(`SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE stock < 5) AS low_stock FROM products`),
      query(`SELECT COUNT(*) AS total FROM customers`),
      query(`SELECT COUNT(*) AS count, COALESCE(SUM(amount),0) AS amount FROM bills WHERE status='unpaid'`),
    ])
    res.json({
      today_sales:    parseFloat(sales.rows[0].today),
      total_products: parseInt(products.rows[0].total),
      low_stock:      parseInt(products.rows[0].low_stock),
      total_customers:parseInt(customers.rows[0].total),
      unpaid_count:   parseInt(unpaid.rows[0].count),
      unpaid_amount:  parseFloat(unpaid.rows[0].amount),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* GET /api/reports/top-products */
router.get('/top-products', async (_req, res) => {
  try {
    const { rows } = await query(
      `SELECT p.name, p.category, SUM(bi.quantity) AS units_sold, SUM(bi.quantity * p.price) AS revenue
       FROM bill_items bi JOIN products p ON bi.product_id = p.id
       JOIN bills b ON bi.bill_id = b.id WHERE b.status='paid'
       GROUP BY p.id, p.name, p.category ORDER BY revenue DESC LIMIT 10`
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* GET /api/reports/top-customers */
router.get('/top-customers', async (_req, res) => {
  try {
    const { rows } = await query(
      `SELECT c.name, c.email, COUNT(b.id) AS orders, COALESCE(SUM(b.amount),0) AS total_spent
       FROM customers c JOIN bills b ON b.customer_id=c.id WHERE b.status='paid'
       GROUP BY c.id, c.name, c.email ORDER BY total_spent DESC LIMIT 10`
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
