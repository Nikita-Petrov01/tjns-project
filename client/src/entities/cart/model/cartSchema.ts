import { z } from "zod";

// схема для корзины

export const cartSchema = z.object({
    id: z.number(),
    userId: z.number(),
});

// схема для создания корзины 

export const newCartSchema = z.object({
    userId: z.number(),
});

// Схема для элемента корзины

export const cartItemSchema = z.object({
    id: z.number(),
    cartId: z.number(),
    productId: z.number(),
    quantity: z.number().min(1, 'Количество не может быть меньше 1'),
    price: z.number().min(0, 'Цена не может быть отрицательной'),
    addedAt: z.string(),
    expiresAt: z.string(),
    product: z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        images: z.array(z.string()),
        price: z.number(),
        categoryId: z.number(),
        stock: z.number().optional(),
    }).optional(),
});

export const guestCartItemSchema = z.object({
    id: z.number(),
    cartId: z.number(),
    productId: z.number(),
    quantity: z.number().min(1, "Количество не может быть меньше 1"),
    price: z.number().min(0, "Цена не может быть отрицательной"),
    addedAt: z.string(),
    expiresAt: z.string(),
    product: z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      images: z.array(z.string()),
      price: z.number(),
      categoryId: z.number(),
      stock: z.number().optional(),
    }),
  });

export const cartItemArraySchem = z.array(cartItemSchema);
export const guestCartItemArraySchem = z.array(guestCartItemSchema);

// Схема для добавления элемента в корзину
export const newCartItemSchema = z.object({
    productId: z.number(),
    quantity: z.number().min(1, 'Количество не может быть меньше 1'),
    price: z.number().min(0, 'Цена не может быть отрицательной'),
});

// Схема для обновления элемента корзины

export const updateCartItemSchema = z.object({
    quantity: z.number().min(1, 'Количество не может быть меньше 1'),
});
