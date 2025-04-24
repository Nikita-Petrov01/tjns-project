import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { logoutUser } from '../../entities/user/model/userThunks';

function Layout(): React.JSX.Element {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" className="shadow">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Elbrus-Yelp
          </Navbar.Brand>

          <Nav className="ms-auto d-flex align-items-center gap-2">
            {user ? (
              <>
                <Button variant="outline-light" onClick={() => void dispatch(logoutUser())}>
                  Выйти
                </Button>
                <Button variant="outline-light">Создать ресторан</Button>
              </>
            ) : (
              <>
                <Button variant="outline-light">Войти</Button>
                <Button variant="outline-light">Зарегистрироваться</Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Layout;
