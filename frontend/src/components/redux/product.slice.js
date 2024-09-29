import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productApiCall } from "../apis/callApi";

export const productThunk = createAsyncThunk("product", async () => {
  try {
    const result = await productApiCall();
    return result;
  } catch (e) {
    console.log(e);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    loading: false,
    cart: [],
  },

  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((res) => res.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(productThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(productThunk.fulfilled, (state, action) => {
      state.product = action.payload;
    });
    builder.addCase(productThunk.rejected, (state, action) => {
      state.loading = true;
    });
  },
});

export const { addToCart, removeItem } = productSlice.actions;

export default productSlice.reducer;
