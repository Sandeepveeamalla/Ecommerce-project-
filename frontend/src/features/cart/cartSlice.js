import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addToCartApi,
  getCartItemsApi,
  increaseCartItemApi,
  decreaseCartItemApi,
} from '../../services/cartService.js';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, thunkAPI) => {
    try {
      return await getCartItemsApi();
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch cart items');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartItem, thunkAPI) => {
    try {
      return await addToCartApi(cartItem);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to add item to cart');
    }
  }
);

export const increaseCartItem = createAsyncThunk(
  'cart/increaseCartItem',
  async (id, thunkAPI) => {
    try {
      return await increaseCartItemApi(id);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to increase quantity');
    }
  }
);

export const decreaseCartItem = createAsyncThunk(
  'cart/decreaseCartItem',
  async (id, thunkAPI) => {
    try {
      return await decreaseCartItemApi(id);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to decrease quantity');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching cart items';
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error adding item to cart';
      })
      .addCase(increaseCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(increaseCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error increasing quantity';
      })
      .addCase(decreaseCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decreaseCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(decreaseCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error decreasing quantity';
      });
  },
});

export default cartSlice.reducer;