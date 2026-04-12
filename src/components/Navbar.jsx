import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      style={{
        padding: '15px',
        backgroundColor: '#f4f4f4',
        display: 'flex',
        gap: '15px',
      }}
    >
      <Link to="/products">Products</Link>
      <Link to="/add-product">Add Product</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  );
}

export default Navbar;