function ProductTable({ products, onAddToCart }) {
  return (
    <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  onClick={() =>
                    onAddToCart({
                      cartId: 1,
                      productId: product.id,
                      quantity: 1,
                    })
                  }
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No products found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ProductTable;