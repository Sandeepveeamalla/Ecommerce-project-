import { Routes, Route, Navigate } from 'react-router-dom';
import ProductListPage from '../pages/ProductListPage.jsx';
import AddProductPage from '../pages/AddProductPage.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/add-product" element={<AddProductPage />} />
    </Routes>
  );
}

export default AppRoutes;