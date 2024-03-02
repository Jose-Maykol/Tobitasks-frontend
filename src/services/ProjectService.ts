import api from '@/config/axios'

class ProjectService {
  public async get<T> (): Promise<T> {
    const response = await api.get('projects')
    return response.data
  }
}

export default new ProjectService()
