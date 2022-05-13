import { configureStore } from '@reduxjs/toolkit';

import productsSlice from './product';
import cartSlice from './cart';

export default configureStore({
    reducer: {
        products: productsSlice,
        cart: cartSlice,
    },
});
