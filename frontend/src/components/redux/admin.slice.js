import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkMail,
  deleteUser,
  getAllUsers,
  login,
  updateUser,
} from "../apis/callApi";
import toast from "react-hot-toast";

export const createThunk = createAsyncThunk(
  "create",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await checkMail(formData);
      if (result) {
        toast.success("Data sent Successfully!");
        console.log(result);
        return result;
      }
    } catch (e) {
      return rejectWithValue(e.message);
      // console.log(e);
    }
  }
);

//  ! loginThunk

export const loginThunk = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const result = await login(data);
      return result;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

//  ! get users thunk
export const getuserThunk = createAsyncThunk("getUsers", async () => {
  try {
    const result = await getAllUsers();
    return result;
  } catch (e) {
    console.log(e);
  }
});

//  ! delete user thunk
export const deleteUserThunk = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const result = await deleteUser(id);
      return result;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// ! update user thunk
export const updateUserThunk = createAsyncThunk(
  "updateUser",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const result = await updateUser({ id, formData });
      return result;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(createThunk.rejected, (state, action) => {
      state.loading = true;
    });

    // ! login builder

    builder.addCase(loginThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
    });
    // !  get all users
    builder.addCase(getuserThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getuserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getuserThunk.rejected, (state, action) => {
      state.loading = false;
    });
    // !  delete  users
    builder.addCase(deleteUserThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(deleteUserThunk.rejected, (state, action) => {
      state.loading = false;
    });
    // !  update  users 
    builder.addCase(updateUserThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default adminSlice.reducer;

// api
// 1. get
// 2. post
// 3. put
// 4. delete
