import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice.js';
import { addToCart } from '../features/cart/cartSlice.js';
import ProductTable from '../components/ProductTable.jsx';
import Spinner from '../components/Spinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

function ProductListPage() {
  const dispatch = useDispatch();
  const { items, loading, error, currentPage, totalPages, pageSize } = useSelector(
    (state) => state.products
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, size: pageSize, sortBy: 'id' }));
  }, [dispatch, currentPage, pageSize]);

  const handleAddToCart = async (cartItem) => {
    const resultAction = await dispatch(addToCart(cartItem));
    if (addToCart.fulfilled.match(resultAction)) {
      alert('Product added to cart');
    }
  };

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

  const handlePrev = () => {
    if (currentPage > 0) {
      dispatch(fetchProducts({ page: currentPage - 1, size: pageSize, sortBy: 'id' }));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      dispatch(fetchProducts({ page: currentPage + 1, size: pageSize, sortBy: 'id' }));
    }
  };

  const handlePageClick = (page) => {
    dispatch(fetchProducts({ page, size: pageSize, sortBy: 'id' }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Product List</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="number"
          placeholder="Filter by max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {loading && <Spinner />}
      <ErrorMessage message={error} />

      <ProductTable products={filteredProducts} onAddToCart={handleAddToCart} />

      <div style={{ marginTop: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button onClick={handlePrev} disabled={currentPage === 0}>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index)}
            disabled={index === currentPage}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductListPage;