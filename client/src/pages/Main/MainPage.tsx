import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getNotebooks } from '../../entities/notebook/model/notebookThunks';
import NotebookCard from '../../entities/notebook/ui/NotebookCard/NotebookCard';

function MainPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const notebooks = useAppSelector((state) => state.notebooks.notebooks);

  useEffect(() => {
    void dispatch(getNotebooks());
  }, [dispatch]);

  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {notebooks.map((notebook) => (
          <Col key={notebook.id} className="d-flex">
            <NotebookCard notebook={notebook} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MainPage;
