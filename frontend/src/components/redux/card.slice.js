import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cardPost, deleteCard, getAllCards, updateCard } from "../apis/callApi";

// ! post card thunk
export const createCardThunk = createAsyncThunk(
  "card",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await cardPost(formData);
      return result;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// !  get card Slice
export const getAllCardThunk = createAsyncThunk("getCard", async () => {
  try {
    const result = await getAllCards();
    return result;
  } catch (e) {
    console.log(e);
  }
});

// ! delete card thunk

export const deleteCardThunk = createAsyncThunk(
  "deleteCard",
  async (id, { rejectWithValue }) => {
    try {
      const result = await deleteCard(id);
      return result;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// ! update card thunk
export const updateCardThunk = createAsyncThunk(
  "updateCard",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const result = await updateCard({ id, formData });
      return result;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const cardSlice = createSlice({
  name: "card",
  initialState: {
    card: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createCardThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCardThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.card = action.payload;
    });
    builder.addCase(createCardThunk.rejected, (state, action) => {
      state.loading = true;
    });

    //  ? add card state
    builder.addCase(getAllCardThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllCardThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.card = action.payload;
    });
    builder.addCase(getAllCardThunk.rejected, (state, action) => {
      state.loading = true;
    });
    //  ? delete card state
    builder.addCase(deleteCardThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCardThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.card = action.payload;
    });
    builder.addCase(deleteCardThunk.rejected, (state, action) => {
      state.loading = true;
    });
    //  ? update card state
    builder.addCase(updateCardThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCardThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.card = action.payload;
    });
    builder.addCase(updateCardThunk.rejected, (state, action) => {
      state.loading = true;
    });
  },
});

export default cardSlice.reducer;
