import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import {
  BiChevronLeft,
  BiChevronRight,
  BiEdit,
  BiHeart,
  BiSolidHeart,
  BiTrash,
} from 'react-icons/bi';
import { deleteById, getById, getOneProduct } from '../../entities/products/model/productThunk';
import { createReview, getReviewsByProductId } from '../../entities/review/model/reviewThunk';
import { newReviewSchema } from '../../entities/review/model/schema';
import type { ReviewT } from '../../entities/review/model/types';
import { setStateReview } from '../../entities/review/model/reviewSlice';
import useGuestCart from '../../entities/cart/hooks/useGuestCart';
import AddToCartButton from '../../entities/cart/ui/AddToCartButton';
import { addCartItem, updateCartItem } from '../../entities/cart/model/cartThunks';
import { useFavoriteActions } from '../../entities/favorite/api/likeHook';
import { LikeModal } from '../../features/LikeModal/ui/LikeModal';

export default function OneProductPage(): React.JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { handleFavoriteAction, isProductLiked } = useFavoriteActions();

  const prodByCat = useAppSelector((state) => state.products.productsByCategory);
  const product = useAppSelector((state) => state.products.product);
  const comments = useAppSelector((state) => state.rewiew.reviewsByProduct);
  const user = useAppSelector((state) => state.user.user);
  const items = useAppSelector((state) => state.cart.items);
  const userId = useAppSelector((state) => state.user.user?.id);
  const show = useAppSelector((state) => state.rewiew.stateReview);

  const [selected, setSelected] = useState<number | null>(null);
  const [allComments, setAllComments] = useState<ReviewT[]>([]);
  const [value, setValue] = useState<string>('');
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const guestCart = useGuestCart(product?.id ?? 0, product?.stock ?? 0, product?.price ?? 0);

  useEffect(() => {
    if (id) {
      void dispatch(getOneProduct(Number(id)));
      void dispatch(getReviewsByProductId(Number(id)));
    }
    if (user) {
      void dispatch(setStateReview(user.id));
    }
  }, [dispatch, id, user, userId]);

  useEffect(() => {
    void dispatch(getById(product?.categoryId ?? 0));
    setAllComments(comments);
  }, [comments, dispatch, product?.categoryId]);

  const recommended = prodByCat?.filter((item) => item.id !== product?.id).slice(0, 3);
  const nextImage = (): void => {
    if (!product) return;
    setMainImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (): void => {
    if (!product) return;
    setMainImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleComment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (value.length > 1) {
      const validatedData = newReviewSchema.parse({
        text: value,
        productId: product?.id,
        userId: user?.id,
        rating: selected,
      });
      void dispatch(setStateReview(user.id));
      void dispatch(createReview(validatedData));
      setSelected(null);
      setAllComments((prev = []) => [
        ...prev,
        {
          ...validatedData,
          id: user.id,
        },
      ]);
    }
  };

  const rate =
    comments.map((comment) => comment.rating).reduce((a, b) => a + b, 0) / comments.length;

  const quantity = user
    ? (items.find((i) => i.productId === product?.id)?.quantity ?? 0)
    : guestCart.quantity;

  const add = (): void => {
    if (!product) return;
    if (quantity >= product.stock) return;
    if (user) {
      const existingItem = items.find((i) => i.productId === product.id);
      if (existingItem) {
        void dispatch(
          updateCartItem({
            itemId: existingItem.id,
            updateData: { quantity: existingItem.quantity + 1 },
          }),
        );
      } else {
        void dispatch(
          addCartItem({
            productId: product.id,
            quantity: 1,
            price: product.price,
          }),
        );
      }
    } else {
      guestCart.add();
    }
  };

  const remove = (): void => {
    if (!product) return;
    if (user) {
      const existingItem = items.find((i) => i.productId === product.id);
      if (existingItem && existingItem.quantity > 1) {
        void dispatch(
          updateCartItem({
            itemId: existingItem.id,
            updateData: { quantity: existingItem.quantity - 1 },
          }),
        );
      }
    } else {
      guestCart.remove();
    }
  };

  return (
    <div className="min-h-screen bg-[#E6F0FA] pt-20 sm:pt-24 font-poppins">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Кнопки управления (для админа) */}
        {user && user.status !== 'user' && product && (
          <div className="mb-6 flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/products/edit/${product.id.toString()}`);
              }}
              className="p-2 rounded-lg bg-[#F1F5F9] text-[#1A3C6D] hover:bg-[#D1E3F6] transition-all duration-300"
              title="Редактировать"
            >
              <BiEdit className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Вы уверены, что хотите удалить товар?')) {
                  void dispatch(deleteById(product.id));
                  navigate('/');
                }
              }}
              className="p-2 rounded-lg bg-[#F1F5F9] text-[#1A3C6D] hover:bg-[#D1E3F6] transition-all duration-300"
              title="Удалить"
            >
              <BiTrash className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Основной контент: фото + информация */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Галерея */}
          <div className="w-full md:w-1/2">
            <div className="relative mb-4">
              <div className="h-96 bg-white shadow-sm rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={product?.images[mainImageIndex]}
                  className="h-full w-full object-contain p-6"
                  alt={product?.name}
                />
              </div>
              {/* Рейтинг */}
              <div className="absolute top-4 left-4 bg-[#FBBF24] text-[#1A3C6D] text-sm font-semibold rounded-lg px-3 py-1 z-10">
                {rate > 0 ? (
                  <span className="flex items-center gap-1">★ {rate.toFixed(1)}</span>
                ) : (
                  <span className="flex items-center gap-1">★ 0</span>
                )}
              </div>
              {/* Кнопка избранного */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (product) {
                    handleFavoriteAction(product, setShowAuthModal);
                  }
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#D1E3F6] hover:bg-[#B3CFF5] transition-all duration-300 z-10"
                title={
                  isProductLiked(product?.id ?? 0) ? 'Удалить из избранного' : 'Добавить в избранное'
                }
              >
                {isProductLiked(product?.id ?? 0) ? (
                  <BiSolidHeart className="w-6 h-6 text-[#EF4444]" />
                ) : (
                  <BiHeart className="w-6 h-6 text-[#6B7280]" />
                )}
              </button>
              {product?.images.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-[#D1E3F6] transition-all duration-300"
                    onClick={prevImage}
                  >
                    <BiChevronLeft className="w-6 h-6 text-[#1A3C6D]" />
                  </button>
                  <button
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-[#D1E3F6] transition-all duration-300"
                    onClick={nextImage}
                  >
                    <BiChevronRight className="w-6 h-6 text-[#1A3C6D]" />
                  </button>
                </>
              )}
            </div>
            {/* Миниатюры */}
            <div className="flex flex-wrap gap-3 justify-center">
              {product?.images.map((img, index) => (
                <div
                  key={img}
                  className={`rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    mainImageIndex === index
                      ? 'ring-2 ring-[#1A3C6D]/50'
                      : 'hover:ring-2 hover:ring-[#1A3C6D]/30'
                  }`}
                  style={{ width: '64px', height: '64px', ['sm' as any]: { width: '80px', height: '80px' } }}
                  onClick={() => setMainImageIndex(index)}
                >
                  <img
                    src={img}
                    className="w-full h-full object-contain bg-white"
                    alt={`${product?.name} preview ${index}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Информация о товаре */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A3C6D] mb-2">
              {product?.name}
            </h1>
            <p className="text-lg font-bold text-[#1A3C6D] mb-4">
              {product?.price.toLocaleString()} ₽
            </p>
            {product && (
              <div className="mb-4">
                <AddToCartButton
                  quantity={quantity}
                  stock={product.stock}
                  add={add}
                  remove={remove}
                />
              </div>
            )}
            <div className="mb-4">
              <h5 className="text-base font-semibold text-[#1A3C6D] mb-1">Описание</h5>
              <p className="text-sm text-[#6B7280] leading-relaxed">{product?.description}</p>
            </div>
          </div>
        </div>

        {/* Отзывы */}
        <div className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1A3C6D] mb-4">Отзывы о товаре</h3>
          {show && !comments.some((c) => c.userId === user?.id) && (
            <div className="mb-6">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelected(num)}
                    className={`text-xl transition-colors ${
                      selected && selected >= num
                        ? 'text-[#FBBF24]'
                        : 'text-[#6B7280] hover:text-[#FBBF24]'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <form
                onSubmit={handleComment}
                className="flex w-full overflow-hidden rounded-lg bg-[#F1F5F9] shadow-sm focus-within:ring-2 focus-within:ring-[#1A3C6D]/50"
              >
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-grow py-2 px-4 bg-[#F1F5F9] text-[#1A3C6D] placeholder-[#6B7280] focus:outline-none"
                  placeholder="Напишите свой отзыв"
                />
                <button
                  type="submit"
                  disabled={!selected || value.length < 2}
                  className={`px-5 font-medium transition-all duration-300 ${
                    !selected || value.length < 2
                      ? 'bg-[#F1F5F9] text-[#1A3C6D]/50 cursor-not-allowed'
                      : 'bg-[#1A3C6D] text-white hover:bg-[#3B5A9A]'
                  }`}
                >
                  Отправить
                </button>
              </form>
            </div>
          )}
          {allComments.length ? (
            <div className="space-y-4">
              {allComments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-xl bg-white shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-base ${
                            i < comment.rating ? 'text-[#FBBF24]' : 'text-[#6B7280]'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-[#6B7280]">
                      Пользователь #{comment.userId}
                    </span>
                  </div>
                  <p className="text-sm text-[#1A3C6D] leading-snug">{comment.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#F1F5F9] text-[#1A3C6D] px-5 py-4 rounded-xl">
              Пока нет отзывов о этом товаре
            </div>
          )}
        </div>

        {/* Рекомендации */}
        {recommended && recommended.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A3C6D] mb-4">
              Похожие товары
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {recommended.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="transform transition-all duration-300 hover:scale-[1.02] cursor-pointer w-full sm:w-1/3"
                >
                  <div className="rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="h-48 bg-white flex items-center justify-center p-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="object-contain max-w-full max-h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-base font-semibold text-[#1A3C6D] truncate">
                        {product.name}
                      </h4>
                      <p className="text-lg font-bold text-[#1A3C6D] mt-1">
                        {product.price.toLocaleString()} ₽
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <LikeModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
    </div>
  );
}