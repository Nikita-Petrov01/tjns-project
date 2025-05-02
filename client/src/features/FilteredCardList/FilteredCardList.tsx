import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import ProductCard from '../productCard/ProductCard';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { getById } from '../../entities/products/model/productThunk';
import ProductSortButtons from '../ProducSortButton/ProducSortButton';
import { useSortedProducts } from '../ProducSortButton/useSortedProducts';
import { getReviews } from '../../entities/review/model/reviewThunk';

export default function FilteredCardList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const prodByCat = useAppSelector((state) => state.products.productsByCategory);
  const reviews = useAppSelector((state) => state.rewiew.reviews);
  const categories = useAppSelector((state) => state.categories.categories);
  const categoryName = categories.find((cat) => cat.id === Number(id))?.name || 'Категория';

  useEffect(() => {
    void dispatch(getById(Number(id)));
    void dispatch(getReviews());
  }, [dispatch, id]);

  const { sortedProducts, sortType, setSortType } = useSortedProducts(prodByCat, reviews);

  return (
    <div className="min-h-screen bg-[#E6F0FA] pt-20 sm:pt-24 font-poppins">
      <Container>
        <h1 className="text-2xl sm:text-3xl text-[#1A3C6D] font-bold mb-6 text-center sm:text-left">
          {categoryName}
        </h1>
        <ProductSortButtons
          sortType={sortType}
          onSortChange={setSortType}
          className="flex justify-center sm:justify-start mb-6 z-10"
        />

        <Row xs={1} sm={2} md={3} lg={4} className="g-3 sm:g-4">
          {sortedProducts.map((product) => (
            <Col
              key={product.id}
              className="d-flex transform transition-all duration-300 hover:scale-[1.02]"
            >
              <ProductCard product={product} rating={product.averageRating} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}