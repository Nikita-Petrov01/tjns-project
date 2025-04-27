import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import ProductCard from '../productCard/ProductCard';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { getById } from '../../entities/products/model/productThunk';
import ProductSortButtons from '../ProducSortButton/ProducSortButton';

export default function FilteredCardList(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const prodByCat = useAppSelector((state) => state.products.productsByCategory);
  const { id } = useParams();

  useEffect(() => {
    void dispatch(getById(Number(id)));
  }, [dispatch, id]);

  return (
    <Container>
      <ProductSortButtons />
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {prodByCat?.map((product) => (
          <Col key={product.id} className="d-flex">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
