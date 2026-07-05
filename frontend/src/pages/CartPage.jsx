import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCartItems,
  increaseCartItem,
  decreaseCartItem,
} from '../features/cart/cartSlice.js';
import Spinner from '../components/Spinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

function CartPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleIncrease = (id) => {
    dispatch(increaseCartItem(id));
  };

  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseCartItem(id));
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        backgroundColor: '#eaeded',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h1
            style={{
              fontSize: '28px',
              marginBottom: '20px',
              borderBottom: '1px solid #ddd',
              paddingBottom: '12px',
            }}
          >
            Shopping Cart
          </h1>

          {loading && <Spinner />}
          <ErrorMessage message={error} />

          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #ddd',
                  padding: '18px 0',
                  gap: '20px',
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      margin: '0 0 8px 0',
                      fontSize: '20px',
                      color: '#007185',
                    }}
                  >
                    Product ID: {item.productId}
                  </h3>

                  <p style={{ margin: '4px 0', color: '#565959' }}>
                    Cart ID: {item.cartId}
                  </p>

                  <p
                    style={{
                      margin: '8px 0 0 0',
                      color: '#067d62',
                      fontWeight: 'bold',
                    }}
                  >
                    In Stock
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#f0f2f2',
                    border: '1px solid #d5d9d9',
                    borderRadius: '999px',
                    padding: '6px 12px',
                  }}
                >
                  <button
                    onClick={() => handleDecrease(item.id, item.quantity)}
                    disabled={item.quantity === 1}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      fontSize: '18px',
                      cursor: item.quantity === 1 ? 'not-allowed' : 'pointer',
                      opacity: item.quantity === 1 ? 0.4 : 1,
                      width: '28px',
                    }}
                  >
                    -
                  </button>

                  <span
                    style={{
                      minWidth: '24px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '16px',
                    }}
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => handleIncrease(item.id)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      fontSize: '18px',
                      cursor: 'pointer',
                      width: '28px',
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '18px', color: '#565959' }}>
              Your cart is empty.
            </p>
          )}
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: '20px',
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: '22px' }}>
            Subtotal ({subtotal} items)
          </h2>

          <button
            style={{
              width: '100%',
              backgroundColor: '#ffd814',
              border: '1px solid #fcd200',
              borderRadius: '999px',
              padding: '12px',
              fontSize: '15px',
              cursor: 'pointer',
              marginTop: '12px',
            }}
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;