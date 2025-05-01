import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteById, getById, getOneProduct } from '../../entities/products/model/productThunk';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import {
  BiChevronLeft,
  BiChevronRight,
  BiEdit,
  BiHeart,
  BiSolidHeart,
  BiTrash,
} from 'react-icons/bi';
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

  const [selected, setSelected] = useState<number | null>(null);
  const [allComments, setAllComments] = useState<ReviewT[]>([]);
  const [value, setValue] = useState<string>('');
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const product = useAppSelector((state) => state.products.product);
  const comments = useAppSelector((state) => state.rewiew.reviewsByProduct);
  const user = useAppSelector((state) => state.user.user);
  const items = useAppSelector((state) => state.cart.items);
  const userId = useAppSelector((state) => state.user.user?.id);

  const guestCart = useGuestCart(product?.id ?? 0, product?.stock ?? 0, product?.price ?? 0);

  const show = useAppSelector((state) => state.rewiew.stateReview);

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

  const recommended = prodByCat?.filter((item) => item.id !== product?.id).slice(0, 2);
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
    // const data = Object.fromEntries(new FormData(e.currentTarget));
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

    if (quantity >= product.stock) {
      // Больше на складе нет — ничего не делаем
      return;
    }

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
      // Если quantity === 1 — кнопку "-" можно скрыть или дизейблить
    } else {
      guestCart.remove();
    }
  };

  return (
    <div className="container mx-auto mt-4 px-4">
      {/* Кнопки управления (для админа) */}
      {user && user.status !== 'user' && product && (
        <div className="mb-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              void navigate(`/products/edit/${product.id.toString()}`);
            }}
            className="p-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition-colors"
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
            className="p-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors"
            title="Удалить"
          >
            <BiTrash className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Галерея */}
        <div className="w-full md:w-1/2">
          {/* Основное изображение */}
          <div className="relative mb-6 border rounded-2xl h-96 bg-gray-50 shadow-sm overflow-hidden">
            <img
              src={product?.images[mainImageIndex]}
              className="block w-full h-full object-contain p-6 transition-transform duration-300 ease-in-out hover:scale-105"
              alt={product?.name}
            />
            {product?.images.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white border border-gray-200 rounded-full shadow-md p-2 hover:bg-gray-100 transition"
                  onClick={prevImage}
                >
                  <BiChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white border border-gray-200 rounded-full shadow-md p-2 hover:bg-gray-100 transition"
                  onClick={nextImage}
                >
                  <BiChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}
          </div>

          {/* Миниатюры */}
          <div className="flex flex-wrap gap-3 justify-center">
            {product?.images.map((img, index) => (
              <div
                key={img}
                className={`rounded-lg overflow-hidden border cursor-pointer transition-all duration-200 ${
                  mainImageIndex === index
                    ? 'border-blue-500 ring-2 ring-blue-300'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
                style={{ width: '80px', height: '80px' }}
                onClick={() => setMainImageIndex(index)}
              >
                <img
                  src={img}
                  className="w-full h-full object-contain bg-white"
                  alt={`${product.name} preview ${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Информация о товаре */}
        <div className="w-full md:w-1/2">
          <div className="mb-6 flex items-center gap-4">
            {product && (
              <AddToCartButton
                quantity={quantity}
                stock={product.stock}
                add={add}
                remove={remove}
              />
            )}

            {/* Рейтинг */}
            <div className="mb-4">
              {rate > 0 ? (
                <span className="text-yellow-500 text-2xl font-medium flex items-center gap-1">
                  ★ {rate.toFixed(1)}
                </span>
              ) : (
                <span className="text-gray-300 text-2xl font-medium">★ 0</span>
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
              className="p-2 border rounded-full hover:bg-gray-100 transition-colors"
              title={
                isProductLiked(product?.id ?? 0) ? 'Удалить из избранного' : 'Добавить в избранное'
              }
            >
              {isProductLiked(product?.id ?? 0) ? (
                <BiSolidHeart className="w-6 h-6 text-red-500" />
              ) : (
                <BiHeart className="w-6 h-6" />
              )}
            </button>
          </div>

          <LikeModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />

          {/* Название товара */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product?.name}</h1>

          {/* Цена */}
          <div className="mb-6">
            <h2 className="text-red-600 text-4xl font-bold tracking-tight">
              {product?.price.toFixed(2)} ₽
            </h2>
          </div>

          {/* Кнопки корзины */}
          <div className="mb-6">
            {product && (
              <AddToCartButton
                quantity={quantity}
                stock={product.stock}
                add={add}
                remove={remove}
              />
            )}
          </div>

          {/* Описание */}
          <div className="mb-6 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gray-100 px-5 py-3 border-b border-gray-200">
              <h5 className="font-semibold text-gray-700 text-lg">Описание</h5>
            </div>
            <div className="p-5">
              <p className="text-gray-700 leading-relaxed">{product?.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Отзывы и рекомендации */}
      <div className="mt-8 flex items-start gap-8">
        {/* Левый столбец: отзывы */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">Отзывы о товаре</h3>

          {show && !comments.some((c) => c.userId === user?.id) && (
            <div className="mb-2">
              {/* Выбор рейтинга */}
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelected(num)}
                    className={`text-2xl transition-colors ${
                      selected >= num ? 'text-violet-600' : 'text-gray-300 hover:text-violet-400'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {/* Поле + кнопка */}
              <form
                onSubmit={handleComment}
                className="flex w-150 overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-violet-500"
              >
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-grow py-2 focus:outline-none"
                  placeholder="Напишите свой отзыв"
                />
                <button
                  type="submit"
                  disabled={!selected || value.length < 2}
                  className={`px-5 font-medium transition-colors ${
                    !selected || value.length < 2
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-violet-600 text-white hover:bg-violet-700'
                  }`}
                >
                  Отправить
                </button>
              </form>
            </div>
          )}

          {/* Список отзывов */}
          {allComments.length ? (
            <div className="space-y-4">
              {allComments.map((comment) => (
                <div
                  key={comment.id}
                  className="w-150 border border-gray-200 rounded-2xl shadow-sm bg-white overflow-hidden"
                >
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < comment.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">Пользователь #{comment.userId}</span>
                    </div>
                    <p className="text-gray-700 leading-snug text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-violet-50 text-violet-800 px-5 py-4 rounded-xl border border-violet-100 text-left">
              Пока нет отзывов о этом товаре
            </div>
          )}
        </div>

        {/* Правый столбец: рекомендации */}
        {recommended && (
          <div className="w-full lg:w-1/2">
            <h3 className="text-xl font-bold mb-4">Похожие товары</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recommended.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="
            w-60                        
            border border-gray-200
            rounded-xl
            overflow-hidden
            transform transition-all duration-300
            hover:scale-105  hover:bg-gray-50
          "
                >
                  <div className="w-full h-48 flex items-center justify-center bg-gray-50">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-contain object-center max-w-full max-h-full mt-4"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-gray-600 mt-1">{product.price.toFixed(2)} ₽</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
