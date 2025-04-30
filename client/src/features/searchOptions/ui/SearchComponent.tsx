import { setSearchProducts } from '../../../entities/products/model/productsSlice';
import { useAppDispatch } from '../../../shared/lib/hooks';

function SearchComponent(): React.JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <form className="max-w-5xl w-150   mx-auto">
      <div className="relative">
        <input
          type="search"
          id="search-dropdown"
          className="w-full p-2 pr-10 rounded-full border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder=" Search..."
          required
          onChange={(e) => dispatch(setSearchProducts(e.target.value))}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          />
        </div>
      </div>
    </form>
  );
}

export default SearchComponent;
