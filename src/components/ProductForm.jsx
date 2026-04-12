import { useState } from 'react';

function ProductForm({ onProductCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    await onProductCreated(newProduct);

    setFormData({
      name: '',
      price: '',
      stock: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '300px',
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
