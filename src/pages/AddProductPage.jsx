import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productSlice.js';
import ProductForm from '../components/ProductForm.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

function AddProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitError, setSubmitError] = useState('');

  const handleProductCreated = async (product) => {
    setSubmitError('');

    const resultAction = await dispatch(addProduct(product));

    if (addProduct.fulfilled.match(resultAction)) {
      navigate('/products');
    } else {
      setSubmitError('Failed to create product');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Product</h2>
      <ErrorMessage message={submitError} />
      <ProductForm onProductCreated={handleProductCreated} />
    </div>
  );
}

export default AddProductPage;