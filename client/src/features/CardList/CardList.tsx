import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../productCard/ProductCard';
import { useNavigate } from 'react-router';
import { getProducts } from '../../entities/products/model/productThunk';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getReviews } from '../../entities/review/model/reviewThunk';
import ProductSortButtons from '../ProducSortButton/ProducSortButton';

type RatingT = {
  sum: number;
  count: number;
};

export default function CardList(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getProducts());
    void dispatch(getReviews());
  }, [dispatch]);

  const navigate = useNavigate();
  const products = useAppSelector((store) => store.products.products);
  const reviews = useAppSelector((store) => store.rewiew.reviews);
  const searchedProducts = useAppSelector((store) => store.search.results);
  const searchQuery = useAppSelector((store) => store.search.query);

  const averageRatings = reviews.reduce((acc: Record<number, RatingT>, review) => {
    if (!(review.productId in acc)) {
      acc[review.productId] = { sum: 0, count: 0 };
    }
    acc[review.productId].sum += review.rating;
    acc[review.productId].count += 1;
    return acc;
  }, {});

  const productsWithRating = products.map((product) => ({
    ...product,
    averageRating:
      product.id in averageRatings
        ? averageRatings[product.id].sum / averageRatings[product.id].count
        : 0,
  }));

  // Определяем какие продукты показывать
  const productsToDisplay = searchQuery.length > 0 ? searchedProducts : productsWithRating;

  return (
    <Container>
      <ProductSortButtons />
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {productsToDisplay.map((product) => (
          <Col key={product.id} className="d-flex">
            <ProductCard product={product} rating={product.averageRating} />
          </Col>
        ))}
      </Row>
      <button onClick={() => navigate('/products/create')}>Add</button>
    </Container>
  );
}
