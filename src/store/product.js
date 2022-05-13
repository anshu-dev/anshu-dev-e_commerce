import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {}
);

export const fetchVouchers = createAsyncThunk(
    'products/fetchVouchers',
    async () => {}
);

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        // state
    },
    extraReducers: {
        // fetchProducts
        // fetchVouchers
    },
});

export default productsSlice.reducer;
