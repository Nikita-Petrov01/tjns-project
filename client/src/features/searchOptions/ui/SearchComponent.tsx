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
    // Здесь можно добавить логику для перехода к товару/категории
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
    <div className="relative max-w-lg mx-auto" ref={dropdownRef}>
      <div className="flex">
        <div className="relative w-full">
          <input
            type="search"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsDropdownOpen(true)}
            className="block py-2 px-4 w-full text-black bg-white rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-200 shadow-sm hover:border-blue-300"
            placeholder="Введите название товара или категории..."
            required
            style={{
              minWidth: '400px',
              maxWidth: '500px',
              height: '40px',
            }}
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 h-full text-white bg-blue-600 hover:bg-blue-700 rounded-e-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300/50 transition-all"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
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
        <div className="absolute z-20 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-auto">
          {/* Секция категорий */}
          {filteredCategories.length > 0 && (
            <div className="border-b border-gray-200">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                Категории
              </div>
              <ul>
                {filteredCategories.map((category) => (
                  <li key={category.id} className="hover:bg-blue-50 transition-colors">
                    <button
                      type="button"
                      onClick={() => navigate(`/categories/${category.id.toString()}`)}
                      className="flex items-center w-full px-4 py-3 text-left"
                    >
                      <div className="mr-3 text-blue-500">
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
                      <span className="font-medium text-gray-800">{category.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Секция товаров */}
          {results.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">Товары</div>
              <ul>
                {results.map((item) => (
                  <li
                    key={item.id}
                    className="hover:bg-blue-50 transition-colors border-t border-gray-100"
                  >
                    <button
                      type="button"
                      onClick={() => handleItemClick(item.name)}
                      className="flex items-center w-full px-4 py-3 text-left"
                    >
                      <div className="mr-3 text-blue-500">
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
                        <span className="block font-medium text-gray-800">{item.name}</span>
                        <span className="block text-xs text-gray-500 mt-1">
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
