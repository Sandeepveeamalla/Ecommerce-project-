import { createProduct } from '../services/productService.js';
import ProductForm from '../components/ProductForm.jsx';
import { useNavigate } from 'react-router-dom';

function AddProductPage() {
  const navigate = useNavigate();

  const handleProductCreated = async (product) => {
    try {
      await createProduct(product);
      navigate('/products');
    } catch (error) {
      console.error('Error creating product:', error);
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
