import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productSlice.js';
import ProductForm from '../components/ProductForm.jsx';

function AddProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductCreated = async (product) => {
    const resultAction = await dispatch(addProduct(product));

    if (addProduct.fulfilled.match(resultAction)) {
      navigate('/products');
    } else {
      console.error('Error creating product');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Product</h2>
      <ProductForm onProductCreated={handleProductCreated} />
    </div>
  );
}

export default AddProductPage;