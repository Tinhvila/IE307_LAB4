import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FavoriteItem } from '../types/favoriteItem.type';
import { FETCH_USER_API } from '../api/fetchIp';

const apiBaseUrl = FETCH_USER_API;

type FavoriteState = {
  items: FavoriteItem[];
  loading: boolean;
  error: string | null;
};

const initialState: FavoriteState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  'favorite/fetchFavorites',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/${id}`);
      return response.data.favorite;
    } catch (error) {
      return rejectWithValue('Không thể tải danh sách yêu thích');
    }
  }
);

export const addToFavorites = createAsyncThunk(
  'favorite/addToFavorites',
  async (
    { id, item }: { id: string; item: FavoriteItem },
    { rejectWithValue }
  ) => {
    try {
      const userResponse = await axios.get(`${apiBaseUrl}/${id}`);
      const currentFavorites = userResponse.data.favorite || [];

      const existingItem = currentFavorites.find(
        (favItem: FavoriteItem) => favItem.id === item.id
      );

      if (existingItem) {
        return rejectWithValue('Sản phẩm đã có trong danh sách yêu thích');
      }

      const updatedFavorites = [...currentFavorites, item];

      const response = await axios.patch(`${apiBaseUrl}/${id}`, {
        favorite: updatedFavorites,
      });

      return response.data.favorite;
    } catch (error) {
      return rejectWithValue('Không thể thêm vào danh sách yêu thích');
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorite/removeFromFavorites',
  async (
    { id, itemId }: { id: string; itemId: string },
    { rejectWithValue }
  ) => {
    try {
      const userResponse = await axios.get(`${apiBaseUrl}/${id}`);
      const currentFavorites = userResponse.data.favorite;

      const updatedFavorites = currentFavorites.filter(
        (item: FavoriteItem) => item.id !== itemId
      );

      const response = await axios.patch(`${apiBaseUrl}/${id}`, {
        favorite: updatedFavorites,
      });
      return response.data.favorite;
    } catch (error) {
      return rejectWithValue('Không thể xóa khỏi danh sách yêu thích');
    }
  }
);

export const clearFavorites = createAsyncThunk(
  'favorite/clearFavorites',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${apiBaseUrl}/${id}`, {
        favorite: [],
      });
      return response.data.favorite;
    } catch (error) {
      return rejectWithValue('Không thể xóa danh sách yêu thích');
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add to Favorites
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Remove from Favorites
      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Clear Favorites
      .addCase(clearFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearFavorites.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default favoriteSlice.reducer;
