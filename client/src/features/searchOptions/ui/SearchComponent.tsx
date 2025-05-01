import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { searchProducts } from '../../../entities/searchOptions/model/searchThunks';
import { getCategories } from '../../../entities/category/model/categoryThunks';
import { useNavigate } from 'react-router';

function SearchComponent(): React.JSX.Element {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { results } = useAppSelector((state) => state.search);
  const navigate = useNavigate();

  // Получаем все категории
  const categories = useAppSelector((state) => state.categories.categories);

  // Загружаем категории при монтировании
  useEffect(() => {
    void dispatch(getCategories());
  }, [dispatch]);

  // Поиск с debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 2) {
        void dispatch(searchProducts(query));
      } else {
        setIsDropdownOpen(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, dispatch]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setQuery(value);
    setIsDropdownOpen(value.length > 0);
  };

  const handleItemClick = (itemName: string): void => {
    setQuery(itemName);
    setIsDropdownOpen(false);
  };

  const handleClear = (): void => {
    setQuery('');
    setIsDropdownOpen(false);
  };

  // Закрытие dropdown при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto font-roboto" ref={dropdownRef}>
      <div className="flex items-center">
        <div className="relative w-full">
          <input
            type="search"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsDropdownOpen(query.length > 0)}
            className="block w-full py-2 sm:py-2.5 px-4 text-sm sm:text-base text-[#05386B] bg-[#EDF5E1] rounded-lg border-2 border-[#379683] focus:ring-2 focus:ring-[#5CD8B5] focus:border-[#5CD8B5] outline-none transition-all duration-200 shadow-sm hover:border-[#5CD8B5] placeholder-[#05386B]/60"
            placeholder="Поиск товаров или категорий..."
            required
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-1/2 right-12 sm:right-14 transform -translate-y-1/2 text-[#05386B] hover:text-[#379683] transition-colors duration-200"
            >
              <svg
                className="w-4 sm:w-5 h-4 sm:h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <button
            type="submit"
            className="absolute top-0 right-0 p-2 sm:p-2.5 h-full text-[#EDF5E1] bg-[#379683] hover:bg-[#5CD8B5] rounded-r-lg border border-[#379683] hover:border-[#5CD8B5] focus:ring-2 focus:ring-[#5CD8B5]/50 transition-all duration-200"
          >
            <svg
              className="w-4 sm:w-5 h-4 sm:h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </div>

      {isDropdownOpen && (results.length > 0 || filteredCategories.length > 0) && (
        <div className="absolute z-60 w-full mt-2 bg-[#EDF5E1] rounded-lg shadow-xl border border-[#5CD8B5] max-h-80 overflow-auto transform transition-all duration-200 animate-fadeIn">
          {/* Секция категорий */}
          {filteredCategories.length > 0 && (
            <div className="border-b border-[#5CD8B5]">
              <div className="px-4 py-2 text-xs font-semibold text-[#05386B] bg-[#8EE4AF]">
                Категории
              </div>
              <ul>
                {filteredCategories.map((category) => (
                  <li key={category.id} className="hover:bg-[#8EE4AF] transition-all duration-200">
                    <button
                      type="button"
                      onClick={() => navigate(`/categories/${category.id.toString()}`)}
                      className="flex items-center w-full px-4 py-3 text-left"
                    >
                      <div className="mr-3 text-[#379683]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-[#05386B]">{category.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Секция товаров */}
          {results.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-[#05386B] bg-[#8EE4AF]">
                Товары
              </div>
              <ul>
                {results.map((item) => (
                  <li
                    key={item.id}
                    className="hover:bg-[#8EE4AF] transition-all duration-200 border-t border-[#5CD8B5]"
                  >
                    <button
                      type="button"
                      onClick={() => handleItemClick(item.name)}
                      className="flex items-center w-full px-4 py-3 text-left"
                    >
                      <div className="mr-3 text-[#379683]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                      <div>
                        <span className="block font-medium text-[#05386B]">{item.name}</span>
                        <span className="block text-xs text-[#05386B]/60 mt-1">
                          Категория:{' '}
                          {categories.find((c) => c.id === item.categoryId)?.name ?? 'Не указана'}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
