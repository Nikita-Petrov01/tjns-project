import React, { useEffect, useState, useRef } from 'react';
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    void dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = useAppSelector((store) => store.categories.categories);
  const toggleSidebar = (): void => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = (): void => setIsSidebarOpen(false);

  const favoriteCount = favorites.filter((fav) => fav.userId === user?.id).length;
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isAdmin = user?.status === 'admin' || user?.status === 'superadmin';

  return (
    <>
      {/* Затемнение фона при открытии сайдбара */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />

      <nav
        className={`fixed top-0 left-0 w-full bg-[#05386B] text-[#EDF5E1] shadow-lg py-4 px-6 sm:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 z-50 font-roboto transition-transform duration-300 ${
          isScrolled ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <svg
          className="absolute bottom-0 left-0 w-full h-12"
          viewBox="0 0 1440 100" 
          preserveAspectRatio="none"
        >
          <path d="M0,0 C30,30 720,90 1440,20 V100 H0 Z" fill="#379683" />
        </svg>

        <div className="flex items-center gap-4 z-10">
          <button
            className="text-[#EDF5E1] text-2xl hover:text-[#5CD8B5] transition-colors duration-300 focus:outline-none p-2 rounded-full"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
          <Link
            to="/"
            className="text-[#8EE4AF] text-3xl font-bold tracking-tight hover:text-[#5CD8B5] transition-colors duration-300 no-underline"
          >
            TJNS
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center gap-4 z-10">
          <div className="w-full max-w-xl">
            <SearchComponent />
          </div>
        </div>

        <div className="flex items-center gap-4 z-10">
          <div className="flex gap-4">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#379683] hover:bg-[#5CD8B5] text-[#EDF5E1] transition-colors duration-200 relative group"
              onClick={() => navigate('/favorites')}
              onMouseEnter={() => setIsFavoriteHovered(true)}
              onMouseLeave={() => setIsFavoriteHovered(false)}
              aria-label="Избранное"
            >
              {isFavoriteHovered ? <HeartFill size={20} /> : <Heart size={20} />}
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#5CD8B5] text-[#05386B] text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </button>

            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#379683] hover:bg-[#5CD8B5] text-[#EDF5E1] transition-colors duration-200 relative group"
              onClick={() => navigate('/cart')}
              onMouseEnter={() => setIsCartHovered(true)}
              onMouseLeave={() => setIsCartHovered(false)}
              aria-label="Корзина"
            >
              {isCartHovered ? <CartFill size={20} /> : <Cart size={20} />}
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#5CD8B5] text-[#05386B] text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                className="w-10 h-10 flex items-center justify-center bg-[#379683] text-[#EDF5E1] rounded-full font-bold hover:scale-105 transition-transform"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
              >
                {user.name[0].toUpperCase()}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#EDF5E1] border border-[#5CD8B5] rounded-xl shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 font-semibold text-[#05386B] border-b">{user.name}</div>
                  {isAdmin && (
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-[#8EE4AF] text-sm text-[#05386B]"
                      onClick={() => {
                        void navigate('/admin');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      Личный кабинет
                    </button>
                  )}
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-[#8EE4AF] text-sm text-[#05386B]"
                    onClick={() => {
                      void navigate('/orders');
                      setIsUserMenuOpen(false);
                    }}
                  >
                    История заказов
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-[#8EE4AF] text-sm text-[#05386B]"
                    onClick={() => {
                      void navigate('/favorites');
                      setIsUserMenuOpen(false);
                    }}
                  >
                    Избранное
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-[#8EE4AF] text-sm text-[#05386B]"
                    onClick={() => {
                      void navigate(isAdmin ? '/admin/chat' : '/chat');
                      setIsUserMenuOpen(false);
                    }}
                  >
                    Чат поддержки
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-[#5CD8B5] text-sm text-[#05386B]"
                    onClick={() => {
                      void dispatch(logoutUser());
                      setIsUserMenuOpen(false);
                    }}
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="text-[#EDF5E1] px-4 py-2 rounded-3xl hover:bg-[#5CD8B5] text-sm transition-colors duration-300"
                onClick={() => void navigate('/login')}
              >
                Войти
              </button>
              <button
                className="bg-[#379683] hover:bg-[#5CD8B5] text-[#EDF5E1] px-4 py-2 rounded-3xl text-sm shadow-lg transition-colors duration-300"
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
        className={`fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-[#8EE4AF] to-[#5CD8B5] shadow-2xl transform transition-transform duration-500 ease-in-out z-40 font-roboto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 bg-[#379683] text-[#EDF5E1]">
          <h2 className="text-2xl font-bold tracking-tight">Категории</h2>
          <button
            className="text-[#EDF5E1] hover:text-[#05386B] transition-colors duration-300 p-2 rounded-full hover:bg-[#8EE4AF]"
            onClick={closeSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="p-6 space-y-3">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-[#05386B] hover:bg-[#EDF5E1] hover:text-[#379683] rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg no-underline font-medium"
              onClick={closeSidebar}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Все товары
            </Link>
          </li>

          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/categories/${category.id.toString()}`}
                className="flex items-center gap-3 px-4 py-3 text-[#05386B] hover:bg-[#EDF5E1] hover:text-[#379683] rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg no-underline font-medium"
                onClick={closeSidebar}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}