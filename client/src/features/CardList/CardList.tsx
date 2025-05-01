import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getProducts } from '../../entities/products/model/productThunk';
import { getReviews } from '../../entities/review/model/reviewThunk';
import ProductSortButtons from '../ProducSortButton/ProducSortButton';
import ProductCard from '../productCard/ProductCard';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useSortedProducts } from '../ProducSortButton/useSortedProducts';
import { getFavorites } from '../../entities/favorite/model/favoriteThunks';

export default function CardList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  const products = useAppSelector((store) => store.products.products);
  const reviews = useAppSelector((store) => store.rewiew.reviews);
  const searchedProducts = useAppSelector((store) => store.search.results);
  const searchQuery = useAppSelector((store) => store.search.query);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      void dispatch(getFavorites(user.id));
    }
    void dispatch(getProducts());
    void dispatch(getReviews());
  }, [dispatch, user]);

  const activeProducts = searchQuery.length > 0 ? searchedProducts : products;

  const { sortedProducts, sortType, setSortType } = useSortedProducts(activeProducts, reviews);

  const itemsPerPage = 12;
  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);

  const offset = currentPage * itemsPerPage;
  const productsToDisplay = sortedProducts.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDF5E1] to-[#8EE4AF] pt-20 sm:pt-24 font-roboto">
      <div className="container mx-auto px-4 sm:px-6">
        <ProductSortButtons
          sortType={sortType}
          onSortChange={setSortType}
          className="flex justify-center sm:justify-start mb-6 z-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {productsToDisplay.map((product) => (
            <div
              key={product.id}
              className="flex transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <ProductCard product={product} rating={product.averageRating} />
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex justify-center">
          <ReactPaginate
            previousLabel={<ChevronLeft size={20} className="text-[#379683]" />}
            nextLabel={<ChevronRight size={20} className="text-[#379683]" />}
            breakLabel={<MoreHorizontal size={18} className="text-[#05386B]" />}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            renderOnZeroPageCount={null}
            containerClassName="flex items-center gap-2"
            pageClassName="w-8 h-8 flex items-center justify-center text-[#05386B] hover:bg-[#8EE4AF] hover:text-[#379683] rounded-full transition-all duration-200"
            activeClassName="bg-[#5CD8B5] text-[#05386B] font-bold"
            previousClassName="w-8 h-8 flex items-center justify-center hover:bg-[#8EE4AF] rounded-full transition-all duration-200"
            nextClassName="w-8 h-8 flex items-center justify-center hover:bg-[#8EE4AF] rounded-full transition-all duration-200"
            breakClassName="w-8 h-8 flex items-center justify-center"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}