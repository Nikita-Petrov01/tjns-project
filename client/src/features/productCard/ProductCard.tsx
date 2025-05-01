import type { ProductT } from '../../entities/products/model/types';
import { useNavigate } from 'react-router';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useState } from 'react';
import { LikeModal } from '../LikeModal/ui/LikeModal';
import { useFavoriteActions } from '../../entities/favorite/api/likeHook';

type Props = {
  product: ProductT;
  rating?: number;
};

export default function ProductCard({ product, rating }: Props): React.JSX.Element {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { handleFavoriteAction, isProductLiked, loading } = useFavoriteActions();
  const isLiked = isProductLiked(product.id);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div
        className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer w-72 h-96"
        onClick={() => navigate(`/products/${product.id.toString()}`)}
      >
        {/* Рейтинг */}
        {rating !== undefined && (
          <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-600 text-sm font-semibold px-2 py-1 rounded">
            ★ {rating.toFixed(1)}
          </div>
        )}

        <div className="absolute top-2 right-2 flex gap-2">
          <button
            className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            title="favorite"
            onClick={(e) => {
              e.stopPropagation();
              void handleFavoriteAction(product, setShowAuthModal);
            }}
          >
            {isLiked ? <BiSolidHeart className="text-red-500" size={18} /> : <BiHeart size={18} />}
          </button>
        </div>

        {/* Изображение товара */}
        <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img src={product.images[0]} alt={product.name} className="h-full object-contain p-2" />
        </div>
        {/* Информация о товаре */}
        <div className="flex flex-col flex-grow p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          <p className="text-sm text-gray-600 flex-grow line-clamp-3">{product.description}</p>
          <p className="text-lg font-bold text-gray-900 mt-4">{product.price.toLocaleString()} ₽</p>
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
