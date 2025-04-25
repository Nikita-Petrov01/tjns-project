import type React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getOneProduct } from '../../entities/products/model/productThunk';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { getReviewsByProductId } from '../../entities/review/model/reviewThunk';

export default function OneProductPage(): React.JSX.Element {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.products.product);
  const comments = useAppSelector((state) => state.rewiew.reviewsByProduct);

  useEffect(() => {
    void dispatch(getOneProduct(Number(id)));
    void dispatch(getReviewsByProductId(Number(id)));
  }, [dispatch, id]);

  const [mainImageIndex, setMainImageIndex] = useState(0);

  const nextImage = (): void => {
    if (!product) return;
    setMainImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (): void => {
    if (!product) return;
    setMainImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const rate =
    comments.map((comment) => comment.rating).reduce((a, b) => a + b, 0) / comments.length;

  return (
    <div className="container mt-4">
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
                <img
                  src={img}
                  className="w-100 h-100 object-fit-contain"
                  alt={`${product.name} preview ${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Информация о товаре */}
        <div className="col-md-6">
          {rate > 0 ? (
            <span className="text-warning fs-3"> ★{rate}</span>
          ) : (
            <span className="text-muted fs-3"> ★ 0</span>
          )}
          <h1 className="mb-3">{product?.name} </h1>

          <div className="mb-4">
            <h2 className="text-danger">{product?.price.toFixed(2)} ₽</h2>
          </div>

          <div className="d-flex gap-2 mb-4">
            <button className="btn btn-danger py-2 flex-grow-1">В корзину</button>
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

      <div className="mt-5">
        <h3 className="mb-4">Отзывы о товаре</h3>

        {comments.length ? (
          <div className="row g-3">
            {comments.map((comment) => (
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
