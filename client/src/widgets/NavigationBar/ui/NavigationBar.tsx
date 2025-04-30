import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { getCategories } from '../../../entities/category/model/categoryThunks';
import { logoutUser } from '../../../entities/user/model/userThunks';
import SearchComponent from '../../../features/searchOptions/ui/SearchComponent';
import { Heart, HeartFill, Cart, CartFill } from 'react-bootstrap-icons';

export default function NavigationBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const cartItems = useAppSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  useEffect(() => {
    void dispatch(getCategories());
  }, [dispatch]);

  const categories = useAppSelector((store) => store.categories.categories);
  const toggleSidebar = (): void => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = (): void => setIsSidebarOpen(false);

  // Подсчет количества избранных товаров и товаров в корзине
  const favoriteCount = favorites.filter((fav) => fav.userId === user?.id).length;
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav className="bg-light shadow-lg h-16 flex items-center justify-between px-6 rounded-b-2xl">
        <div className="flex items-center gap-4">
          <button
            className="text-dark text-2xl hover:text-primary transition-colors duration-300 focus:outline-none p-2 rounded-full"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
          <Link
            to="/"
            className="text-primary text-2xl font-bold tracking-tight hover:text-secondary transition-colors duration-300"
          >
            TJNS
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <SearchComponent />
        </div>

        <div className="flex items-center gap-4">
          {/* Кнопка избранного */}
          <div
            className="relative cursor-pointer p-2"
            onMouseEnter={() => setIsFavoriteHovered(true)}
            onMouseLeave={() => setIsFavoriteHovered(false)}
            onClick={() => navigate('/favorites')}
          >
            {isFavoriteHovered ? (
              <HeartFill size={20} className="text-red-500 transition-all duration-300" />
            ) : (
              <Heart
                size={20}
                className="text-gray-500 hover:text-red-500 transition-all duration-300"
              />
            )}

            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </div>

          {/* Кнопка корзины */}
          <div
            className="relative cursor-pointer p-2"
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
            onClick={() => navigate('/cart')}
          >
            {isCartHovered ? (
              <CartFill size={20} className="text-primary transition-all duration-300" />
            ) : (
              <Cart
                size={20}
                className="text-gray-500 hover:text-primary transition-all duration-300"
              />
            )}

            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>

          {user && (
            <span className="text-dark bg-light px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              {user.name}
            </span>
          )}
          {user ? (
            <button
              className="bg-red-600 hover:bg-red-700 text-light px-5 py-2 rounded-full text-sm shadow-lg transition-colors duration-300"
              onClick={() => void dispatch(logoutUser())}
            >
              Выйти
            </button>
          ) : (
            <>
              <button
                className="text-dark px-5 py-2 rounded-3xl hover:bg-light text-sm transition-colors duration-300"
                onClick={() => void navigate('/login')}
              >
                Войти
              </button>
              <button
                className="text-light bg-primary hover:bg-secondary px-5 py-2 rounded-3xl text-sm shadow-lg transition-colors duration-300"
                onClick={() => void navigate('/signup')}
              >
                Зарегистрироваться
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-light shadow-xl transform transition-transform duration-300 ease-in-out
        z-40 border-r border-tertiary w-64
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="flex items-center justify-between p-4 border-b border-tertiary rounded-t-2xl">
          <h2 className="text-lg font-semibold text-dark hover:text-primary transition-colors duration-300 shadow-md p-2 rounded-3xl">
            Категории
          </h2>
          <button
            className="text-dark hover:text-secondary transition-colors duration-300 p-2 rounded-full hover:shadow-lg"
            onClick={closeSidebar}
          >
            ✕
          </button>
        </div>

        <ul className="p-4 space-y-3">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/categories/${category.id.toString()}`}
                className="block px-5 py-3 text-dark hover:bg-primary hover:text-light rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={closeSidebar}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        <button
          className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-secondary text-light transition-colors duration-200 shadow-lg relative group"
          onClick={() => navigate('/favorites')}
          aria-label="Избранное"
          onMouseEnter={() => setIsFavoriteHovered(true)}
          onMouseLeave={() => setIsFavoriteHovered(false)}
        >
          {isFavoriteHovered ? (
            <HeartFill
              size={24}
              className="text-white transform group-hover:scale-110 transition-transform"
            />
          ) : (
            <Heart
              size={24}
              className="text-white transform group-hover:scale-110 transition-transform"
            />
          )}
          {favoriteCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {favoriteCount}
            </span>
          )}
        </button>

        <button
          className="w-16 h-16 flex items-center justify-center rounded-full bg-dark hover:bg-primary text-light transition-colors duration-200 shadow-lg relative group"
          onClick={() => navigate('/cart')}
          aria-label="Корзина"
          onMouseEnter={() => setIsCartHovered(true)}
          onMouseLeave={() => setIsCartHovered(false)}
        >
          {isCartHovered ? (
            <CartFill
              size={24}
              className="text-white transform group-hover:scale-110 transition-transform"
            />
          ) : (
            <Cart
              size={24}
              className="text-white transform group-hover:scale-110 transition-transform"
            />
          )}
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
