import { toast } from 'react-toastify';
import type { ProductT } from '../../entities/products/model/types';
import { deleteById } from '../../entities/products/model/productThunk';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { BiEdit, BiHeart, BiSolidHeart, BiTrash } from 'react-icons/bi';
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

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Card
        className="h-100 shadow-sm position-relative"
        style={{
          cursor: 'pointer',
          transition: 'transform 0.2s',
          minHeight: '400px',
        }}
        onClick={() => navigate(`/products/${product.id.toString()}`)}
      >
        {/* Рейтинг */}
        {rating !== undefined && (
          <div className="position-absolute top-0 start-0 p-2 z-1 text-warning">
            ★ {rating.toFixed(1)}
          </div>
        )}
        {/* Кнопки действий */}
        <div className="position-absolute top-0 end-0 p-2 d-flex gap-2 z-1">
          <Button
            variant="outline-primary"
            size="sm"
            title="favorite"
            onClick={deleteFavoriteHandler}
          >
            {isLiked ? <BiSolidHeart color="red" size={18} /> : <BiHeart size={18} />}
          </Button>

          <Button
            variant="outline-primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              void navigate(`/products/edit/${product.id.toString()}`);
            }}
            title="Edit"
          >
            <BiEdit />
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              void dispatch(deleteById(product.id));
            }}
            title="Delete"
          >
            <BiTrash />
          </Button>
        </div>
        {/* Изображение товара */}
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <Card.Img
            variant="top"
            src={product.images[0]}
            alt={product.name}
            className="h-100 object-fit-contain p-2"
          />
        </div>
        {/* Информация о товаре */}
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate">{product.name}</Card.Title>
          <Card.Text
            className="flex-grow-1 text-muted"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </Card.Text>
          <Card.Text className="fw-bold fs-5 mt-auto">{product.price.toLocaleString()} ₽</Card.Text>
        </Card.Body>
      </Card>

      <LikeModal
        show={showAuthModal}
        onHide={() => {
          setShowAuthModal(false);
        }}
      />
    </>
  );
}
