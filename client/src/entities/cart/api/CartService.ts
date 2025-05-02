import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import type { AddToCartT, CartItemCheckT, CartItemT, CartItemValidationResponseT, CartT, NewCartItemT, UpdateCartItemT, UpdateCartT } from '../model/cartTypes';
import { cartItemSchema, cartSchema, updateCartItemPayload, updateCartItemSchema } from '../model/cartSchema';

class CartService {
  constructor(private readonly client: AxiosInstance) {}

  // Cart

  async getOrCreateCart(): Promise<CartT> {
    try {
      const response = await this.client.get('/carts');
      console.log('Сырые данные с сервера:', response.data);
      const transformedData = {
        ...response.data,
        cartItems: (response.data.CartItems || []).map((item: any) => ({
          ...item,
          product: item.Product, // Преобразуем Product в product
        })),
      };
      console.log('Преобразованные данные:', transformedData);
      const parsedData = cartSchema.parse(transformedData);
      console.log('Спарсенные данные:', parsedData);
      return parsedData;
    } catch (error) {
      console.error('Ошибка при получении или создании корзины:', error);
      throw error;
    }
  }

  // async createCartWithItems(items: GuestCartItemT[]): Promise<void> {
  //   try {
  //     await this.client.post('/carts/with-items', { items });
  //   } catch (error) {
  //     console.error('Ошибка при создании корзины с элементами:', error);
  //     throw error;
  //   }
  // }

  // async deleteCart(): Promise<void> {
  //   try {
  //     await this.client.delete('/carts');
  //   } catch (error) {
  //     console.error('Ошибка при удалении корзины:', error);
  //     throw error;
  //   }
  // }

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

  async addCartItem(item: AddToCartT): Promise<CartItemT> {
    try {
      const respose = await this.client.post('/cartItem', item);
      return cartItemSchema.parse(respose.data);
    } catch (error) {
      console.error('Ошибка при добавлении элемента в корзину:', error);
      throw error;
    }
  }

  async updateCartItem(itemId: number, updateData: UpdateCartT): Promise<CartItemT> {
    try {
      updateCartItemPayload.parse(updateData)
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
      return itemId;
    } catch (error) {
      console.error('Ошибка при удалении элемента корзины:', error);
      throw error;
    }
  }

  // async checkCartItems(cartItems: CartItemCheckT[]): Promise<CartItemValidationResponseT> {
  //   try {
  //     const response = await this.client.post('/cartItem/validate', { cartItems });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Ошибка при проверке элементов корзины:', error);
  //     throw error;
  //   }
  // }
}

export default new CartService(axiosInstance);
