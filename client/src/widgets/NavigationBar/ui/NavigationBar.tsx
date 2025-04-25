import React, { useEffect } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { getCategories } from '../../../entities/category/model/categoryThunks';
import { logoutUser } from '../../../entities/user/model/userThunks';
import SearchComponent from '../../../features/searchOptions/ui/SearchComponent';


export default function NavigationBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    void dispatch(getCategories());
  }, [dispatch]);

  const categories = useAppSelector((store) => store.categories.categories);

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="shadow"
      style={{ height: '12vh', marginBottom: '2rem', fontSize: '20px', padding: '0px 40px' }}
    >
      <Navbar.Brand as={Link} to="/" style={{ color: 'red' }}>
        TJNS - мир бытовых техник
      </Navbar.Brand>
      <Container>
        <NavDropdown
          title="Категория товаров"
          id="collapsible-nav-dropdown"
          style={{ color: 'white' }}
        >
          {categories.map((category) => (
            <NavDropdown.Item
              key={category.id}
              as={Link}
              to={`/categories/${category.id.toString()}`}
              style={{ fontSize: '18px' }}
            >
              {category.name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>

        <SearchComponent />
        <Nav className="ms-auto d-flex align-items-center gap-2">
          {user ? (
            <>
              <Button
                variant="outline-light"
                onClick={() => void dispatch(logoutUser())}
                style={{ fontSize: '18px', marginRight: '10px' }}
              >
                Выйти
              </Button>
              <Button variant="outline-light">Создать ресторан</Button>
            </>
          ) : (
            <>
              <Button variant="outline-light" style={{ fontSize: '18px', marginRight: '10px' }}>
                Войти
              </Button>
              <Button variant="outline-light" style={{ fontSize: '18px' }}>
                Зарегистрироваться
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
