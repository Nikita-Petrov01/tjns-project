import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getFavorites } from '../../entities/favorite/model/favoriteThunks';
import { Container } from 'react-bootstrap';
import { getProducts } from '../../entities/products/model/productThunk';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { useFavoriteActions } from '../../entities/favorite/api/likeHook';
import { LikeModal } from '../../features/LikeModal/ui/LikeModal';

export default function FavoritePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Используем наш кастомный хук
  const { handleFavoriteAction, isProductLiked } = useFavoriteActions();

  const favorites = useAppSelector((state) => state.favorites.favorites);
  const userId = useAppSelector((state) => state.user.user?.id);
  const products = useAppSelector((state) => state.products.products);

  useEffect(() => {
    if (userId) {
      void dispatch(getFavorites(userId));
      void dispatch(getProducts());
    }
  }, [dispatch, userId]);

  // Получаем массив ID избранных товаров для текущего пользователя
  const favoriteProductIds = favorites
    .filter((fav) => fav.userId === userId)
    .map((fav) => fav.productId);

  // Фильтруем продукты, которые есть в избранном у пользователя
  const favoriteProducts = products.filter((product) => favoriteProductIds.includes(product.id));

  if (!userId) {
    return (
      <Container className="mt-4">
        <h2>Пожалуйста, войдите в систему, чтобы просмотреть избранное</h2>
      </Container>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <Container className="mt-4">
        <h2>Избранные товары</h2>
        <p>У вас пока нет избранных товаров</p>
      </Container>
    );
  }

  return (
    <>
      <Container className="mt-4">
        <h2>Вам понравилось:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer w-72 h-96"
              onClick={() => navigate(`/products/${product.id.toString()}`)}
            >
              {/* Кнопка избранного */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                  title="favorite"
                  onClick={(e) => {
                    e.stopPropagation();
                    void handleFavoriteAction(product, setShowAuthModal);
                  }}
                >
                  {/* Используем isProductLiked из хука */}
                  {isProductLiked(product.id) ? (
                    <BiSolidHeart className="text-red-500" size={18} />
                  ) : (
                    <BiHeart size={18} />
                  )}
                </button>
              </div>

              {/* Изображение товара */}
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full object-contain p-2"
                />
              </div>

              {/* Информация о товаре */}
              <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-sm text-gray-600 flex-grow line-clamp-3">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-4">
                  {product.price.toLocaleString()} ₽
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Модалка для неавторизованных пользователей */}
      <LikeModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
    </>
  );
}
