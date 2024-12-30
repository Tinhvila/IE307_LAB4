import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItem } from '../types/cartItem.type';

const apiBaseUrl = 'https://fakestoreapi.com/carts';

interface CartState {
  items: CartItem[];
  totalAmount: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  loading: false,
  error: null,
};

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/user/${userId}`);
      const cartItems = response.data[0].products;

      const productDetailsPromises = cartItems.map(
        async (item: { productId: number; quantity: number }) => {
          const productResponse = await axios.get(
            `https://fakestoreapi.com/products/${item.productId}`
          );
          const product = productResponse.data;
          return {
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.image,
            quantity: item.quantity,
          };
        }
      );

      const detailedCartItems = await Promise.all(productDetailsPromises);
      return detailedCartItems;
    } catch (error) {
      return rejectWithValue('Failed to fetch cart items');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    updateCartItem: (
      state,
      action: PayloadAction<{ itemId: number; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.id === action.payload.itemId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalAmount = action.payload.reduce(
          (sum: number, item: CartItem) => sum + item.price * item.quantity,
          0
        );
        state.loading = false;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addItemToCart, updateCartItem, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
