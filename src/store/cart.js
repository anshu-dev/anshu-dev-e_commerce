import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProduct: [],
  },
  reducers: {
    addProduct: (state, action) => {
      return {
        ...state,
        cartProduct: [...state.cartProduct, { ...action.payload, quantity: 1 }],
      };
    },
    removeProduct: (state, action) => {
      const r = state.cartProduct;
      const s = r.filter((product) => product.id !== action.payload);
      return { ...state, cartProduct: [...s] };
    },
    updateQuantity: (state, action) => {
      const filterProduct = state.cartProduct.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: product.quantity + action.payload.quantity,
          };
        }
        return product;
      });
      return {
        ...state,
        cartProduct: [...filterProduct],
      };
    },
    applyVoucher: (state, action) => {
      const filterProduct = state.cartProduct.map((product) => {
        if (product.id === action.payload.productid) {
          return { ...product, discount: action.payload.discount };
        }
        return product;
      });
      return {
        ...state,
        cartProduct: [...filterProduct],
      };
    },
    productsPurchased: (state, action) => {
      //
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateQuantity,
  applyVoucher,
  productsPurchased,
} = cartSlice.actions;

export default cartSlice.reducer;
