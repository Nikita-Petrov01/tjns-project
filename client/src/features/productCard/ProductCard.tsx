import { toast } from 'react-toastify';
import type { ProductT } from '../../entities/products/model/types';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { useNavigate } from 'react-router';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import {
  createFavorite,
  deleteFavorite,
  getFavorites,
} from '../../entities/favorite/model/favoriteThunks';
import { useEffect, useState } from 'react';
import { LikeModal } from '../LikeModal/ui/LikeModal';

type Props = {
  product: ProductT;
  rating?: number;
};

export default function ProductCard({ product, rating }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const user = useAppSelector((state) => state.user.user);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isLiked = favorites.some(
    (favorite) => favorite.productId === product.id && favorite.userId === user?.id,
  );
  const loading = useAppSelector((state) => state.favorites.loading);

  useEffect(() => {
    if (user) {
      void dispatch(getFavorites(user.id));
    }
  }, [dispatch, user]);

  const deleteFavoriteHandler = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation();
    if (!user) {
      toast.info('Войдите, чтобы добавлять товары в избранное');
      setShowAuthModal(true);
      return;
    }
    try {
      if (isLiked) {
        await dispatch(deleteFavorite({ userId: user.id, productId: product.id })).unwrap();
        toast.success('Товар удалён из избранного');
      } else {
        await dispatch(createFavorite({ userId: user.id, productId: product.id })).unwrap();
        toast.success('Товар добавлен в избранное');
      }
    } catch (error) {
      console.error('Ошибка при работе с избранным', error);
    }
  };

  if (loading) return <div className="text-[#05386B] text-center">Loading...</div>;

  return (
    <>
      <div
        className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 cursor-pointer w-full"
        onClick={() => navigate(`/products/${product.id.toString()}`)}
      >
        {/* Рейтинг */}
        {rating !== undefined && (
          <div className="absolute top-2 left-2 bg-[#5CD8B5] text-[#05386B] text-sm font-semibold px-2 py-1 rounded">
            ★ {rating.toFixed(1)}
          </div>
        )}
        {/* Кнопки действий */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            className="p-1 bg-[#EDF5E1] rounded-full shadow-sm hover:bg-[#8EE4AF] transition-colors duration-200"
            title="favorite"
            onClick={deleteFavoriteHandler}
          >
            {isLiked ? (
              <BiSolidHeart className="text-[#379683]" size={18} />
            ) : (
              <BiHeart className="text-[#05386B]" size={18} />
            )}
          </button>
        </div>
        {/* Изображение товара */}
        <div className="h-48 bg-[#EDF5E1] flex items-center justify-center overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-contain p-2"
          />
        </div>
        {/* Информация о товаре */}
        <div className="flex flex-col flex-grow p-4">
          <h3 className="text-base sm:text-lg font-semibold text-[#05386B] truncate">
            {product.name}
          </h3>
          <p className="text-sm text-[#05386B] flex-grow line-clamp-3">
            {product.description}
          </p>
          <p className="text-base sm:text-lg font-bold text-[#379683] mt-4">
            {product.price.toLocaleString()} ₽
          </p>
        </div>
      </div>

      <LikeModal
        show={showAuthModal}
        onHide={() => {
          setShowAuthModal(false);
        }}
      />
    </>
  );
}