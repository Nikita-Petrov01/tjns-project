import React, { useEffect } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { getCategories } from '../../../entities/category/model/categoryThunks';
import { logoutUser } from '../../../entities/user/model/userThunks';
import SearchComponent from '../../../features/searchOptions/ui/SearchComponent';

export default function NavigationBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

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
      style={{
        height: '12vh',
        marginBottom: '2rem',
        fontSize: '20px',
        padding: '0px 40px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Navbar.Brand as={Link} to="/" style={{ color: 'red' }}>
        TJNS - мир техник
      </Navbar.Brand>
      <Container>
        <Button
          variant="outline-light"
          onClick={() => navigate('/cart')}
          style={{ fontSize: '18px', marginRight: '10px' }}
        >
          Корзина
        </Button>
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
              <Button variant="outline-light" onClick={() => void navigate('/categories/create')}>
                Добавить категорию
              </Button>

              <Button variant="outline-light" onClick={() => void navigate('/products/create')}>
                Добавить продукт
              </Button>

              <Nav style={{ color: 'white', margin: '0px 20px' }}>Здравствуйте, {user.name}</Nav>

              <Button
                variant="outline-light"
                onClick={() => void dispatch(logoutUser())}
                style={{ fontSize: '18px' }}
              >
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-light"
                style={{ fontSize: '18px', marginRight: '10px' }}
                onClick={() => void navigate('/login')}
                onClick={() => navigate('/login')}
                variant="outline-light"
                style={{ fontSize: '18px', marginRight: '10px' }}
              >
                Войти
              </Button>
              <Button
                variant="outline-light"
                style={{ fontSize: '18px' }}
                onClick={() => void navigate('/singup')}
                onClick={() => navigate('/signup')}
                variant="outline-light"
                style={{ fontSize: '18px' }}
              >
                Зарегистрироваться
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
