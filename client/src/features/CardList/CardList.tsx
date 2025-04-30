import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getProducts } from '../../entities/products/model/productThunk';
import { getReviews } from '../../entities/review/model/reviewThunk';
import ProductSortButtons from '../ProducSortButton/ProducSortButton';
import ProductCard from '../productCard/ProductCard';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import './pagination.css';
import { useSortedProducts } from '../ProducSortButton/useSortedProducts';

export default function CardList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0);


  const products = useAppSelector((store) => store.products.products);
  const reviews = useAppSelector((store) => store.rewiew.reviews);
  const searchedProducts = useAppSelector((store) => store.search.results);
  const searchQuery = useAppSelector((store) => store.search.query);

  useEffect(() => {
    void dispatch(getProducts());
    void dispatch(getReviews());
  }, [dispatch]);


  const { sortedProducts, sortType, setSortType } = useSortedProducts(products, reviews);


  const itemsPerPage = 12;
  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = sortedProducts.slice(offset, offset + itemsPerPage);


  const productsToDisplay = searchQuery.length > 0 ? searchedProducts : currentItems;


  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="container mx-auto px-4">
      <ProductSortButtons sortType={sortType} onSortChange={setSortType} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {productsToDisplay.map((product) => (
          <div key={product.id} className="flex">
            <ProductCard product={product} rating={product.averageRating} />
          </div>
        ))}
      </div>

      <div className="mt-20">
        <ReactPaginate
          previousLabel={<ChevronLeft size={20} />}
          nextLabel={<ChevronRight size={20} />}
          breakLabel={<MoreHorizontal size={18} className="text-gray-400" />}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="selected"
        />
      </div>
    </div>
  );
}
