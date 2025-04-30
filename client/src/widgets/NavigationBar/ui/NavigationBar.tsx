import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { getCategories } from '../../../entities/category/model/categoryThunks';
import { logoutUser } from '../../../entities/user/model/userThunks';
import SearchComponent from '../../../features/searchOptions/ui/SearchComponent';
// import { getCart } from '../../../entities/cart/model/cartThunks';

export default function NavigationBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    void dispatch(getCategories());
  }, [dispatch]);
  // const handleCreateCart = (): void => {
  //   void dispatch(getCart()).unwrap().then(() => navigate('/cart'));
  // };
  const categories = useAppSelector((store) => store.categories.categories);
  const toggleSidebar = (): void => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = (): void => setIsSidebarOpen(false);

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

        <div className="flex items-center gap-3">
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

      {/* Floating Cart Button */}
      <button
        className="fixed bottom-6 right-6 w-16 h-16 flex items-center justify-center rounded-full bg-dark hover:bg-primary text-light transition-colors duration-200"
        onClick={() => navigate('/cart')}
        aria-label="Корзина"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="2em"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          {/* SVG path корзины */}
          <path d="M...Z" />
        </svg>
      </button>
    </>
  );
}
