import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getAllRestaurants } from '../../entities/restaurant/model/restaurantThunks';
import RestaurantCard from '../../entities/restaurant/ui/RestaurantCard/RestaurantCard';
import RestaurantAddModal from '../../features/restaurant-add/ui/RestaurantAddModal';
import RestaurantEditModal from '../../features/restaurant-edit/ui/RestaurantEditModal';

function FirstPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const restaurants = useAppSelector((state) => state.restaurants.restaurants);

  const open = useAppSelector((state) => state.restaurants.isModalOpen);

  useEffect(() => {
    void dispatch(getAllRestaurants());
  }, [dispatch]);

  return (
    <Container>
      {open === 'edit' ? <RestaurantEditModal /> : <RestaurantAddModal />}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {restaurants.map((restaurant) => (
          <Col key={restaurant.id} className="d-flex">
            <RestaurantCard restaurant={restaurant} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FirstPage;
