import { NavLink } from 'react-router-dom';

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    color: isActive ? '#000' : '#333',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <nav
      style={{
        padding: '15px',
        backgroundColor: '#f4f4f4',
        display: 'flex',
        gap: '15px',
      }}
    >
      <NavLink to="/products" style={linkStyle}>
        Products
      </NavLink>

      <NavLink to="/add-product" style={linkStyle}>
        Add Product
      </NavLink>

      <NavLink to="/cart" style={linkStyle}>
        Cart
      </NavLink>
    </nav>
  );
}

export default Navbar;