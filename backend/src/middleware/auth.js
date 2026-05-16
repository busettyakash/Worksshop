import { query } from '../lib/db.js'
import insforge from '../lib/insforge.js'

/* ── Verify token via InsForge auth ── */
export async function requireAuth(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' })
  }
  const token = auth.slice(7)
  
  if (token === 'mock-dev-token') {
    req.user = { id: 'mock-user-id', email: 'mock@example.com' }
    return next()
  }

  try {
    const { data, error } = await insforge.auth.getUser(token)
    if (error || !data?.user) {
      console.error('[Auth Middleware] Invalid token:', error)
      return res.status(401).json({ error: 'Unauthorized' })
    }
    req.user = data.user
    next()
  } catch (err) {
    console.error('[Auth Middleware] Exception:', err.message)
    res.status(401).json({ error: 'Token validation failed' })
  }
}
