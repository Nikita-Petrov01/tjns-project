import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getProducts } from '../../entities/products/model/productThunk';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getReviews } from '../../entities/review/model/reviewThunk';
import ProductSortButtons from '../ProducSortButton/ProducSortButton';
import ProductCard from '../productCard/ProductCard';
import ReactPaginate from 'react-paginate';
import './pagination.css';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';


type RatingT = {
  sum: number;
  count: number;
};

type SortType = 'none' | 'rating-asc' | 'rating-desc' | 'price-asc' | 'price-desc';

export default function CardList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [sortType, setSortType] = useState<SortType>('none');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    void dispatch(getProducts());
    void dispatch(getReviews());
  }, [dispatch]);

  const navigate = useNavigate();
  const products = useAppSelector((store) => store.products.products);
  const reviews = useAppSelector((store) => store.rewiew.reviews);
  const searched = useAppSelector((store) => store.products.searchProducts);

  const averageRatings = reviews.reduce((acc: Record<number, RatingT>, review) => {
    if (!(review.productId in acc)) {
      acc[review.productId] = { sum: 0, count: 0 };
    }
    acc[review.productId].sum += review.rating;
    acc[review.productId].count += 1;
    return acc;
  }, {});

  const productsWithRating = products.map((product) => ({
    ...product,
    averageRating:
      product.id in averageRatings
        ? averageRatings[product.id].sum / averageRatings[product.id].count
        : 0,
  }));

  const filteredProducts = productsWithRating.filter((product) =>
    product.name.toLowerCase().includes(searched.toLowerCase()),
  );

  const sortedProducts = React.useMemo(() => {
    if (sortType === 'none') return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      switch (sortType) {
        case 'rating-asc':
          return a.averageRating - b.averageRating;
        case 'rating-desc':
          return b.averageRating - a.averageRating;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortType]);

  const itemsPerPage = 12;
  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = sortedProducts.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="container mx-auto px-4">
      <ProductSortButtons sortType={sortType} onSortChange={setSortType} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {currentItems.map((product) => (
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
