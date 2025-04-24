import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import CardList from '../../features/CardList/CardList';
// import { useAppDispatch } from '../../shared/lib/hooks';

function MainPage(): React.JSX.Element {
  return (
    <Container>
      <CardList />
    </Container>
  );
}

export default MainPage;
