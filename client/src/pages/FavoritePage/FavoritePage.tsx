import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getFavorites } from '../../entities/favorite/model/favoriteThunks';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { getProducts } from '../../entities/products/model/productThunk';

export default function FavoritePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const userId = useAppSelector((state) => state.user.user?.id);
  const products = useAppSelector((state) => state.products.products);

  useEffect(() => {
    if (userId) {
      void dispatch(getFavorites(userId));
      void dispatch(getProducts());
    }
  }, [dispatch, userId]);

  // Получаем массив ID избранных товаров для текущего пользователя
  const favoriteProductIds = favorites
    .filter((fav) => fav.userId === userId)
    .map((fav) => fav.productId);

  // Фильтруем продукты, которые есть в избранном у пользователя
  const favoriteProducts = products.filter((product) => favoriteProductIds.includes(product.id));

  if (!userId) {
    return (
      <Container className="mt-4">
        <h2>Пожалуйста, войдите в систему, чтобы просмотреть избранное</h2>
      </Container>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <Container className="mt-4">
        <h2>Избранные товары</h2>
        <p>У вас пока нет избранных товаров</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Избранные товары</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {favoriteProducts.map((product) => (
          <Col key={product.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                variant="top"
                src={product.images[0] || 'holder.js/100px180?text=No Image'}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description || 'Описание отсутствует'}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Цена: {product.price} ₽</ListGroup.Item>
                <ListGroup.Item>
                  Статус: {product.stock > 0 ? 'В наличии' : 'Нет в наличии'}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href={`/product/${product.id.toString()}`}>Подробнее</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
