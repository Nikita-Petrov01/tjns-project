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

  useEffect(() => {
    void dispatch(getById(Number(id)));
    void dispatch(getReviews());
  }, [dispatch, id]);

  const { sortedProducts, sortType, setSortType } = useSortedProducts(prodByCat, reviews);

  return (
    <Container>
      <ProductSortButtons sortType={sortType} onSortChange={setSortType} />

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {sortedProducts.map((product) => (
          <Col key={product.id} className="d-flex">
            <ProductCard product={product} rating={product.averageRating} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
