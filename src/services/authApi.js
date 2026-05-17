import apiClient from '../api/client'

export const authApi = {
  login: async ({ email, password }) => {
    const res = await apiClient.post('/auth/login', { email, password })
    return res.data
  },

  register: async (data) => {
    const res = await apiClient.post('/auth/register', {
      shopName:        data.shopName,
      email:           data.email,
      password:        data.password,
      workspaceHandle: data.workspaceHandle,
      billingCountry:  data.billingCountry,
      referralSource:  data.referralSource,
      usageType:       data.usageType,
    })
    return res.data
  },

  me: async () => {
    const res = await apiClient.get('/auth/me')
    return res.data
  },

  logout: async () => {
    try { await apiClient.post('/auth/logout') } catch (_) {}
  },

  sendOtp: async (email, type = 'signup') => {
    const res = await apiClient.post('/auth/send-otp', { email, type })
    return res.data
  },

  verifyOtp: async (email, otp) => {
    const res = await apiClient.post('/auth/verify-otp', { email, otp })
    return res.data
  },
}
