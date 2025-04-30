import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteById, getOneProduct } from '../../entities/products/model/productThunk';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { BiChevronLeft, BiChevronRight, BiEdit, BiTrash } from 'react-icons/bi';
import { createReview, getReviewsByProductId } from '../../entities/review/model/reviewThunk';
import { newReviewSchema } from '../../entities/review/model/schema';
import { Button, ButtonGroup } from 'react-bootstrap';
import type { ReviewT } from '../../entities/review/model/types';
import { setStateReview } from '../../entities/review/model/reviewSlice';
import useGuestCart from '../../entities/cart/hooks/useGuestCart';
import AddToCartButton from '../../entities/cart/ui/AddToCartButton';
import { addCartItem, updateCartItem } from '../../entities/cart/model/cartThunks';

export default function OneProductPage(): React.JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [selected, setSelected] = useState<number | null>(null);
  const [allComments, setAllComments] = useState<ReviewT[]>([]);
  const [value, setValue] = useState<string>('');
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const product = useAppSelector((state) => state.products.product);
  const comments = useAppSelector((state) => state.rewiew.reviewsByProduct);
  const user = useAppSelector((state) => state.user.user);
  const items = useAppSelector((state) => state.cart.items);

  const guestCart = useGuestCart(
    product?.id ?? 0,
    product?.stock ?? 0,
    product?.price ?? 0
  );

  const show = useAppSelector((state) => state.rewiew.stateReview);


  useEffect(() => {
    if (id) {
      void dispatch(getOneProduct(Number(id)));
      void dispatch(getReviewsByProductId(Number(id)));
    }
    if (user) {
      void dispatch(setStateReview(user.id));
    }
  }, [dispatch, id, user]);

  useEffect(() => {
    setAllComments(comments);
  }, [comments]);

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
    ? items.find((i) => i.productId === product?.id)?.quantity ?? 0
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
          void dispatch(updateCartItem({
            itemId: existingItem.id,
            updateData: { quantity: existingItem.quantity + 1 }
          }));
        } else {
          void dispatch(addCartItem({
            productId: product.id,
            quantity: 1,
            price: product.price,
          }));
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
          void dispatch(updateCartItem({
            itemId: existingItem.id,
            updateData: { quantity: existingItem.quantity - 1 }
          }));
        }
        // Если quantity === 1 — кнопку "-" можно скрыть или дизейблить
      } else {
        guestCart.remove();
      }
    };
    
  return (
    <div className="container mt-4">
      {user && user.status !== 'user' && product && (
        <div className="mb-3 d-flex gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              void navigate(`/products/edit/${product.id.toString()}`);
            }}
            title="Редактировать"
          >
            <BiEdit />
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Вы уверены, что хотите удалить товар?')) {
                void dispatch(deleteById(product.id));
               void  navigate('/');
              }
            }}
            title="Удалить"
          >
            <BiTrash />
          </Button>
        </div>
      )}

      <div className="row">
        {/* Галерея */}
        <div className="col-md-6">
          <div className="position-relative mb-3 border rounded" style={{ height: '400px' }}>
            <img
              src={product?.images[mainImageIndex]}
              className="d-block w-100 h-100 object-fit-contain p-2"
              alt={product?.name}
            />
            {product?.images.length > 1 && (
              <>
                <button
                  className="position-absolute top-50 start-0 translate-middle-y btn btn-light rounded-circle shadow-sm ms-2"
                  onClick={prevImage}
                >
                  <BiChevronLeft size={24} />
                </button>
                <button
                  className="position-absolute top-50 end-0 translate-middle-y btn btn-light rounded-circle shadow-sm me-2"
                  onClick={nextImage}
                >
                  <BiChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          <div className="d-flex flex-wrap gap-2">
            {product?.images.map((img, index) => (
              <div
                key={img}
                className={`border rounded p-1 ${mainImageIndex === index ? 'border-primary' : ''}`}
                style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                onClick={() => setMainImageIndex(index)}
              >
                <img src={img} className="w-100 h-100 object-fit-contain" alt={`${product?.name} preview ${index}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Информация о товаре */}
        <div className="col-md-6">
          <span className="fs-3">{rate > 0 ? `★ ${rate.toFixed(1)}` : '★ 0'}</span>
          <h1 className="mb-3">{product?.name}</h1>

          <div className="mb-4">
            <h2 className="text-danger">{product?.price.toLocaleString()} ₽</h2>
          </div>

          <div className="d-flex gap-2 mb-4">
            {product && (
              <AddToCartButton
                quantity={quantity}
                stock={product.stock}
                add={add}
                remove={remove}
              />
            )}
          </div>

          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Описание</h5>
            </div>
            <div className="card-body">
              <p className="card-text">{product?.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Отзывы */}
      <div className="mt-5">
        <h3 className="mb-4">Отзывы о товаре</h3>

        {show && !comments.some((c) => c.userId === user?.id) && (
          <>
            <ButtonGroup aria-label="Rating buttons">
              {[1, 2, 3, 4, 5].map((num) => (
                <Button
                  key={num}
                  variant={selected === num ? 'primary' : 'outline-primary'}
                  onClick={() => setSelected(num)}
                >
                  {num}
                </Button>
              ))}
            </ButtonGroup>
            <form onSubmit={handleComment}>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="form-control"
                placeholder="Напишите свой отзыв"
              />
              <Button type="submit" disabled={!selected || value.length < 2}>
                Отправить
              </Button>
            </form>
          </>
        )}

        {allComments.length > 0 ? (
          <div className="row g-3">
            {allComments.map((comment) => (
              <div key={comment.id} className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`fs-5 ${i < comment.rating ? 'text-warning' : 'text-muted'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <small className="text-muted">Пользователь #{comment.userId}</small>
                    </div>
                    <p className="card-text">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info">Пока нет отзывов о этом товаре</div>
        )}
      </div>
    </div>
  );
}
