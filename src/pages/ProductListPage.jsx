import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice.js';
import { addToCart } from '../features/cart/cartSlice.js';
import ProductTable from '../components/ProductTable.jsx';
import Spinner from '../components/Spinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

function ProductListPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = async (cartItem) => {
    const resultAction = await dispatch(addToCart(cartItem));

    if (addToCart.fulfilled.match(resultAction)) {
      alert('Product added to cart');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Product List</h2>

      {loading && <Spinner />}
      <ErrorMessage message={error} />

      <ProductTable products={items} onAddToCart={handleAddToCart} />
    </div>
  );
}

export default ProductListPage;