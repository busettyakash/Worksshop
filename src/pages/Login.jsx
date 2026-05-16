import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import WorkshopLogo from '../components/WorkshopLogo'
import Notification from '../components/Notification'
import { authApi } from '../services/authApi'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const [step, setStep] = useState('email') // 'email' | 'checking' | 'otp' | 'password'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailContinue = async (e) => {
    e.preventDefault()
    if (!email) return
    setStep('checking')
    try {
      await authApi.sendOtp(email)
      setStep('otp')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP')
      setStep('email')
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await authApi.verifyOtp(email, otp)
      setStep('password')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = await authApi.login({ email, password })
      localStorage.setItem('ws_token', data.token)
      // Store user with success message for dashboard
      localStorage.setItem('ws_user', JSON.stringify({
        shopName: data.user.shopName,
        email: data.user.email,
        successMessage: 'Welcome back! Login successful.'
      }))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ws-auth-layout">
      {error && <Notification message={error} type="error" onClose={() => setError('')} />}
      
      <div className="ws-auth-topbar">
        <Link to="/" className="ws-auth-brand">
          <WorkshopLogo size={26} className="ws-auth-logo" />
          <span className="ws-auth-name">workshop</span>
        </Link>
      </div>

      <div className="ws-auth-main">
        <div className="ws-auth-card">
          <div className="ws-auth-left">
            {step === 'otp' ? (
              <>
                <h1 className="ws-auth-title">Verify your email</h1>
                <p className="ws-auth-subtitle">We've sent a 6-digit code to <strong>{email}</strong>.</p>

                <form className="ws-auth-form" onSubmit={handleVerifyOtp}>
                  <div className="ws-auth-input-group">
                    <div className="ws-auth-input-wrap">
                      <input
                        className="ws-auth-input"
                        placeholder="6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        autoFocus
                        required
                        maxLength={6}
                      />
                    </div>
                  </div>

                  <button type="submit" className="ws-auth-btn-submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </form>
              </>
            ) : step === 'password' ? (
              <>
                <h1 className="ws-auth-title">Welcome back!</h1>
                <p className="ws-auth-subtitle">Enter your password to sign in.</p>

                <form className="ws-auth-form" onSubmit={handleLogin}>
                  <div className="ws-auth-input-group">
                    <div className="ws-auth-input-wrap">
                      <Lock size={14} className="ws-auth-icon" />
                      <input
                        type="password"
                        className="ws-auth-input"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="ws-auth-btn-submit" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h1 className="ws-auth-title">Log in to Workshop</h1>
                <button type="button" className="ws-auth-google-btn">
                  <svg className="ws-auth-google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign in with Google
                </button>

                <div className="ws-auth-divider">
                  <div className="ws-auth-divider-line" />
                  <span className="ws-auth-divider-text">or</span>
                  <div className="ws-auth-divider-line" />
                </div>

                <form className="ws-auth-form" onSubmit={handleEmailContinue}>
                  <div className="ws-auth-input-group">
                    <div className="ws-auth-input-wrap">
                      <Mail size={14} className="ws-auth-icon" />
                      <input
                        type="email"
                        className="ws-auth-input"
                        placeholder="Enter your work email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`ws-auth-btn-submit${step === 'checking' ? ' loading' : ''}`}
                    disabled={step === 'checking'}
                  >
                    {step === 'checking' ? 'Checking email...' : 'Continue'}
                  </button>
                </form>

                <div className="ws-auth-switch" style={{marginTop: 16}}>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
              </>
            )}

            <p className="ws-auth-legal" style={{marginTop: 'auto', paddingTop: 40}}>
              By inserting your email you confirm you agree to Workshop contacting you about our
              product and services. You can opt out at any time. Find out more in our{' '}
              <a href="#">privacy policy</a>.
            </p>
          </div>

          <div className="ws-auth-right">
            <h2 className="ws-auth-right-title">Welcome to Workshop.</h2>
            <p className="ws-auth-right-p">
              Workshop is a radically new type of retail platform. Built on an entirely new type
              of data architecture, you'll have profiles and records for every interaction within
              your store in minutes, always updated in real-time.
            </p>
            <p className="ws-auth-right-p">
              You'll be able to customize and build your platform <em>exactly</em> as you want it.
            </p>
            <p className="ws-auth-right-p" style={{ marginTop: 20, fontWeight: 500, color: 'var(--black)' }}>
              Let's begin.
            </p>
          </div>
        </div>
      </div>

      <div className="ws-auth-footer">
        © {new Date().getFullYear()} Workshop Limited
        <a href="#">Privacy Policy</a>
        <a href="#">Support</a>
      </div>
    </div>
  )
}
