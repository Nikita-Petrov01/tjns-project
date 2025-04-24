import type { AxiosInstance } from 'axios';
import type { NewProductT, ProductT } from '../model/types';
import { newProductSchema, productSchema } from '../model/schema';
import axiosInstance from '../../../shared/api/axiosInstance';

class ProductsService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getProducts(): Promise<ProductT[]> {
    try {
      const response = await this.client.get('/products');
      return productSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getOneProduct(id: number): Promise<ProductT> {
    try {
      const response = await this.client.get(`/products/prod/${id.toString()}`);
      return productSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProductsById(id: number): Promise<ProductT[]> {
    try {
      const response = await this.client.get(`/products/${id.toString()}`);
      return productSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      await this.client.delete(`/products/${id.toString()}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(product: NewProductT): Promise<ProductT> {
    try {
      const response = await this.client.post('/products', product);
      return productSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(product: ProductT): Promise<ProductT> {
    try {
      const { id } = product;
      const data = newProductSchema.parse(product);
      const response = await this.client.put(`/products/${String(id)}`, data);
      return productSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new ProductsService(axiosInstance);
