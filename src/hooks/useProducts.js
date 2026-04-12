import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice.js';
import { addToCart } from '../features/cart/cartSlice.js';

function useProducts() {
  const dispatch = useDispatch();
  const { items, loading, error, currentPage, totalPages, pageSize } = useSelector(
    (state) => state.products
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, size: pageSize, sortBy: 'id' }));
  }, [dispatch, currentPage, pageSize]);

  const filteredProducts = useMemo(() => {
    return items.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesPrice =
        maxPrice === '' || product.price <= Number(maxPrice);

      return matchesName && matchesPrice;
    });
  }, [items, searchTerm, maxPrice]);

  const handleAddToCart = async (cartItem) => {
    const resultAction = await dispatch(addToCart(cartItem));

    if (addToCart.fulfilled.match(resultAction)) {
      alert('Product added to cart');
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      dispatch(fetchProducts({ page: currentPage - 1, size: pageSize, sortBy: 'id' }));
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      dispatch(fetchProducts({ page: currentPage + 1, size: pageSize, sortBy: 'id' }));
    }
  };

  const goToPage = (page) => {
    dispatch(fetchProducts({ page, size: pageSize, sortBy: 'id' }));
  };

  return {
    loading,
    error,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    maxPrice,
    setMaxPrice,
    currentPage,
    totalPages,
    handleAddToCart,
    goToPrevPage,
    goToNextPage,
    goToPage,
  };
}

export default useProducts;