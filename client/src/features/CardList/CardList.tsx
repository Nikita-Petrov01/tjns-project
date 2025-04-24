import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../productCard/ProductCard';
import { useNavigate } from 'react-router';
import { getProducts } from '../../entities/products/model/productThunk';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import CategoryPage from '../../pages/CategoryPage/CategoryPage';

export default function CardList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getProducts());
  }, [dispatch]);
  const products = useAppSelector((state) => state.products.products);

  const navigate = useNavigate();

  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        <CategoryPage />
        {products.map((product) => (
          <Col key={product.id} className="d-flex">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <button onClick={() => navigate('/products/create')}>Add</button>
    </Container>
  );
}
