import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService.js';
import ProductTable from '../components/ProductTable.jsx';

function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.content)) {
        setProducts(data.content);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Product List</h2>
      <ProductTable products={products} />
    </div>
  );
}

export default ProductListPage;