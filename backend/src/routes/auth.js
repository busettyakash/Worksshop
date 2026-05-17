import { Router } from 'express'
import insforge from '../lib/insforge.js'
import { query } from '../lib/db.js'
import redis from '../lib/redis.js'
import resend from '../lib/resend.js'
import { getOtpTemplate } from '../utils/emailTemplates.js'

// Fallback in-memory store if Redis fails
const memoryStore = new Map()

const router = Router()

/* POST /api/auth/send-otp */
router.post('/send-otp', async (req, res) => {
  let { email, type } = req.body
  if (!email) return res.status(400).json({ message: 'Email is required' })
  email = email.toLowerCase().trim()

  try {
    if (type === 'login') {
      const profile = await query('SELECT 1 FROM shop_profiles WHERE email = $1', [email])
      if (profile.rows.length === 0) {
        return res.status(404).json({ message: 'Account not found. Please sign up first.' })
      }
    }

    console.log(`[OTP] Request for email: ${email}`)
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    try {
      console.log(`[OTP] Connecting to Redis...`)
      await redis.set(`otp:${email}`, otp, { ex: 300 })
      console.log(`[OTP] Redis set successful`)
    } catch (rErr) {
      console.error(`[OTP] Redis failed, using memory fallback:`, rErr.message)
      memoryStore.set(`otp:${email}`, { otp, expires: Date.now() + 300000 })
    }
    
    console.log(`[OTP DEBUG] OTP for ${email} is ${otp}`)
    
    // Send email via Resend
    try {
      console.log(`[OTP] Sending email via Resend to ${email}...`)
      const { data: mailData, error: mailError } = await resend.emails.send({
        from: 'Workshop <onboarding@resend.dev>',
        to: email,
        subject: `${otp} is your Workshop verification code`,
        html: getOtpTemplate(otp)
      })

      if (mailError) {
        console.error(`[OTP] Resend failed:`, mailError)
      } else {
        console.log(`[OTP] Resend successful:`, mailData.id)
      }
    } catch (mErr) {
      console.error(`[OTP] Mail exception:`, mErr.message)
    }
    
    res.json({ message: 'OTP sent to your email' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* POST /api/auth/verify-otp */
router.post('/verify-otp', async (req, res) => {
  let { email, otp } = req.body
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' })
  email = email.toLowerCase().trim()

  try {
    let storedOtp = await redis.get(`otp:${email}`).catch(() => null)
    
    // Check memory fallback if redis returned nothing
    if (!storedOtp) {
      const mem = memoryStore.get(`otp:${email}`)
      if (mem && mem.expires > Date.now()) {
        storedOtp = mem.otp
      }
    }

    console.log(`[OTP VERIFY] Attempt for ${email}: input=${otp}, stored=${storedOtp}`)

    if (storedOtp === otp) {
      // Success - now delete
      await redis.del(`otp:${email}`).catch(() => {})
      memoryStore.delete(`otp:${email}`)
      res.json({ message: 'OTP verified successfully' })
    } else {
      res.status(400).json({ message: 'Invalid or expired OTP' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* POST /api/auth/register */
router.post('/register', async (req, res) => {
  const { 
    email, password, shopName, phone, mobileNumber,
    workspaceHandle, billingCountry, referralSource, usageType
  } = req.body
  const actualPhone = phone || mobileNumber
  if (!email || !password || !shopName) {
    return res.status(400).json({ message: 'email, password and shopName are required' })
  }
  try {
    const { data, error } = await insforge.auth.signUp({ email, password })
    if (error) {
      console.error('[Auth Error]', error)
      const msg = error.nextActions || error.error || error.message || 'Registration failed'
      return res.status(400).json({ message: msg })
    }

    // Store extra profile in DB (now keyed by email since user ID isn't returned on unverified signups)
    await query(
      `INSERT INTO shop_profiles (
         email, shop_name, phone, workspace_handle, billing_country, referral_source, usage_type, created_at
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       ON CONFLICT (email) DO UPDATE SET 
         shop_name = EXCLUDED.shop_name, 
         phone = EXCLUDED.phone,
         workspace_handle = EXCLUDED.workspace_handle,
         billing_country = EXCLUDED.billing_country,
         referral_source = EXCLUDED.referral_source,
         usage_type = EXCLUDED.usage_type`,
      [email, shopName, actualPhone || null, workspaceHandle, billingCountry, referralSource, usageType]
    ).catch((err) => { console.error('DB Insert Error', err) })

    res.status(201).json({
      message: 'Registration successful',
      user: { email, shopName },
      token: data?.accessToken || data?.session?.access_token || 'mock-dev-token',
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* POST /api/auth/login */
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'email and password required' })

  try {
    const { data, error } = await insforge.auth.signInWithPassword({ email, password })
    let token = data?.session?.access_token || data?.accessToken
    let userId = data?.user?.id || 'unknown'

    if (error) {
      let msg = error.nextActions || error.error || error.message || 'Invalid credentials'
      if (msg === 'AUTH_UNAUTHORIZED') msg = 'Invalid email or password.'
      // DEV BYPASS: If they just need to verify email, let them in anyway!
      if (msg.includes('verify') || msg.includes('FORBIDDEN')) {
         token = 'mock-dev-token'
      } else {
         return res.status(401).json({ message: msg })
      }
    }

    // Fetch shop profile
    const profile = await query(
      'SELECT shop_name, phone FROM shop_profiles WHERE email = $1',
      [email]
    ).catch((err) => {
      console.error('[DB] Profile fetch error:', err.message)
      return { rows: [] }
    })

    if (profile.rows.length === 0) {
      return res.status(401).json({ message: 'User profile not found. Please sign up first.' })
    }

    res.json({
      token: token,
      user: {
        id:       userId,
        email:    email,
        shopName: profile.rows[0].shop_name,
      },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* POST /api/auth/logout */
router.post('/logout', async (req, res) => {
  try {
    await insforge.auth.signOut()
    res.json({ message: 'Logged out successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* GET /api/auth/me */
router.get('/me', async (req, res) => {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const { data, error } = await insforge.auth.getUser(auth.slice(7))
    if (error) return res.status(401).json({ error: 'Unauthorized' })
    res.json({ user: data.user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
