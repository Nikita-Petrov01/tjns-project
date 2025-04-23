import type { AxiosInstance } from 'axios';
import type { UserFormT, UserLoginFormT, UserT } from '../model/types';
import { authResponseSchema } from '../model/schema';
import axiosInstance from '../../../shared/api/axiosInstance';

class UserService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async signupUser(data: UserFormT): Promise<UserT> {
    try {
      const response = await this.client.post('/auth/signup', data);
      return authResponseSchema.parse(response.data).user;
    } catch (error) {
      console.error('Ошибка регистрации', error)
      throw error
    }
  }

  async loginUser(data: UserLoginFormT): Promise<UserT> {
    try {
        const response = await this.client.post('/auth/login', data);
        return authResponseSchema.parse(response.data).user;
    } catch (error) {
        console.error('Ошибка входа', error)
        throw error
    }
  }

  async refreshUser(): Promise<UserT> {
    try {
        const response = await this.client.get('/token/refresh');
        return authResponseSchema.parse(response.data).user;
    } catch (error) {
        console.error('Ошибка обновления', error)
        throw error
    }
  }

  async logoutUser(): Promise<void> {
    try {
        await this.client.get('/auth/logout');
    } catch (error) {
        console.error('Ошибка выхода', error)
        throw error
    }
  }

}

export default new UserService(axiosInstance);