import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import type { CartItemT, CartT, NewCartItemT, UpdateCartItemT } from '../model/cartTypes';
import { cartItemSchema, cartSchema, newCartItemSchema, updateCartItemSchema } from '../model/cartSchema';
import { formatISO } from 'date-fns';

class CartService {
  constructor(private readonly client: AxiosInstance) {}

  // Cart

  async getOrCreateCart(): Promise<CartT> {
    try {
      const response = await this.client.get('/carts');
      return cartSchema.parse(response.data);
    } catch (error) {
      console.error('Ошибка при получении или создании корзины:', error);
      throw error;
    }
  }

  async deleteCart(): Promise<void> {
    try {
      await this.client.delete('/carts');
    } catch (error) {
      console.error('Ошибка при удалении корзины:', error);
      throw error;
    }
  }

  // CartItem

  async getCartItems(): Promise<CartItemT[]> {
    try {
      const response = await this.client.get('/cartItem');
      return cartItemSchema.array().parse(response.data);
    } catch (error) {
      console.error('Ошибка при получении элементов корзины:', error);
      throw error;
    }
  }

  async addCartItem(item: NewCartItemT): Promise<CartItemT> {
    try {
      const respose = await this.client.post('/cartItem', item);
      return cartItemSchema.parse(respose.data);
    } catch (error) {
      console.error('Ошибка при добавлении элемента в корзину:', error);
      throw error;
    }
  }

  async updateCartItem(itemId: number, updateData: UpdateCartItemT): Promise<CartItemT> {
    try {
      updateCartItemSchema.parse(updateData); // Валидация входных данных
      const response = await this.client.put(`/cartItem/${itemId.toString()}`, updateData);
      return cartItemSchema.parse(response.data);
    } catch (error) {
      console.error('Ошибка при обновлении элемента корзины:', error);
      throw error;
    }
  }

  async deleteCartItem(itemId: number): Promise<number> {
    try {
      await this.client.delete(`/cartItem/${itemId.toString()}`);
      return itemId
    } catch (error) {
      console.error('Ошибка при удалении элемента корзины:', error);
      throw error;
    }
  }

}

export default new CartService(axiosInstance);
