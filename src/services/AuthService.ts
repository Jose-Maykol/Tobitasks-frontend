import api from '@/config/axios'

class AuthService {
  public async login (email: string, password: string): Promise<void> {
    const response = await api.post('auth/login', { email, password })
    return response.data
  }
}

export default new AuthService()
