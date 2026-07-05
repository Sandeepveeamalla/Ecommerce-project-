import ProductTable from '../components/ProductTable.jsx';
import Spinner from '../components/Spinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import useProducts from '../hooks/useProducts.js';

function ProductListPage() {
  const {
    loading,
    error,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    maxPrice,
    setMaxPrice,
    currentPage,
    totalPages,
    handleAddToCart,
    goToPrevPage,
    goToNextPage,
    goToPage,
  } = useProducts();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Product List</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="number"

          min="0"
          placeholder="Filter by max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {loading && <Spinner />}
      <ErrorMessage message={error} />

      <ProductTable products={filteredProducts} onAddToCart={handleAddToCart} />

      <div style={{ marginTop: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button onClick={goToPrevPage} disabled={currentPage === 0}>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            disabled={index === currentPage}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={goToNextPage} disabled={currentPage >= totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductListPage;