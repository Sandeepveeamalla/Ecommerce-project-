import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, createProduct } from '../../services/productService.js';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 0, size = 5, sortBy = 'id' } = {}, thunkAPI) => {
    try {
      return await getProducts(page, size, sortBy);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch products');
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product, thunkAPI) => {
    try {
      return await createProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to create product');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentPage: 0,
    totalPages: 0,
    pageSize: 5,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload.content)) {
          state.items = action.payload.content;
          state.currentPage = action.payload.number ?? 0;
          state.totalPages = action.payload.totalPages ?? 1;
        } else if (Array.isArray(action.payload)) {
          state.items = action.payload;
          state.currentPage = 0;
          state.totalPages = 1;
        } else {
          state.items = [];
          state.currentPage = 0;
          state.totalPages = 0;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching products';
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error creating product';
      });
  },
});

export default productSlice.reducer;