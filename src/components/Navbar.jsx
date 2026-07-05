import { NavLink } from 'react-router-dom';

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    color: '#ffffff',
    fontWeight: isActive ? 'bold' : 'normal',
    padding: '8px 12px',
    border: isActive ? '1px solid white' : '1px solid transparent',
    borderRadius: '4px',
  });

  return (
    <nav
      style={{
        backgroundColor: '#131921',
        padding: '14px 24px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      <div style={{ color: '#ffffff', fontSize: '22px', fontWeight: 'bold', marginRight: '20px' }}>
        amazon
      </div>

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