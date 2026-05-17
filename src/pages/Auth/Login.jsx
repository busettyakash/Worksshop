import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import WorkshopLogo from '../../components/WorkshopLogo'
import Notification from '../../components/Notification'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/ui/Input'
import { authApi } from '../../services/authApi'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const [step, setStep] = useState('email') // 'email' | 'checking' | 'otp' | 'password'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleEmailContinue = async (e) => {
    e.preventDefault()
    if (!email) return
    setStep('checking')
    try {
      await authApi.sendOtp(email, 'login')
      setStep('otp')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP')
      setStep('email')
    }
  }

  const handleResendOtp = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await authApi.sendOtp(email, 'login')
      setSuccess('OTP has been resent successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await authApi.verifyOtp(email, otp)
      setSuccess('OTP verified successfully!')
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
    setSuccess('')

    try {
      const data = await authApi.login({ email, password })
      localStorage.setItem('ws_token', data.token)
      // Store user with success message for dashboard
      localStorage.setItem('ws_user', JSON.stringify({
        shopName: data.user.shopName,
        email: data.user.email,
        successMessage: 'Welcome back! Login successful.'
      }))
      window.location.href = '/dashboard' // Force reload to init Redux with new user
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      {error && <Notification message={error} type="error" onClose={() => setError('')} />}
      {success && <Notification message={success} type="success" onClose={() => setSuccess('')} />}
      
      <div className="ws-auth-form-wrap">
        {step === 'otp' ? (
          <>
            <h1 className="ws-auth-step-title">Verify your email</h1>
            <p className="ws-auth-step-subtitle">We've sent a 6-digit code to <strong>{email}</strong>.</p>

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

              <div className="ws-auth-resend-wrap" style={{ textAlign: 'center', marginTop: '16px' }}>
                <p className="ws-auth-switch" style={{ margin: 0 }}>
                  Didn't receive it?{' '}
                  <button 
                    type="button" 
                    className="ws-text-btn" 
                    onClick={handleResendOtp}
                    disabled={loading}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--color-blue)', 
                      fontWeight: 600, 
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Resend
                  </button>
                </p>
              </div>
            </form>
          </>
        ) : step === 'password' ? (
          <>
            <h1 className="ws-auth-step-title">Welcome back!</h1>
            <p className="ws-auth-step-subtitle">Enter your password to sign in.</p>

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
            <h1 className="ws-auth-step-title">Log in to Workshop</h1>
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

            <div className="ws-auth-switch">
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
    </AuthLayout>
  )
}