import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getItems } from "./appSlice";
export const loginUser = createAsyncThunk(
  "users/login/",
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/login/", user);

      localStorage.setItem(
        "user",
        JSON.stringify({ data: data.user, token: data.token }),
      );

      dispatch(fetchTransactions());
      dispatch(getItems());

      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  "users/signup/",
  async (user, { rejectWithValue }) => {
    try {
      const { lastName, firstName, email, username, password } = user;

      const { data } = await axios.post("users/signup/", {
        last_name: lastName,
        first_name: firstName,
        email,
        username,
        password,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ data: data.user, token: data.token }),
      );
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchTransactions = createAsyncThunk(
  "users/fetchTransactions",
  async () => {
    const { data } = await axios.get("/transaction-history");
    return data;
  },
);

const user = JSON.parse(localStorage.getItem("user"));

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: user ? user.data : null,
    pending: false,
    error: false,
    errorMessage: "",
    transactions: [],
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.pending = false;
      state.error = false;
      state.errorMessage = "";
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.errorMessage = "";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = false;
      state.user = action.payload;
      state.errorMessage = "";
    },
    [loginUser.rejected]: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload.error;
    },
    [registerUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.errorMessage = "";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = false;
      state.user = action.payload;
      state.errorMessage = "";
    },
    [registerUser.rejected]: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload.error;
    },
    [fetchTransactions.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.errorMessage = "";
    },
    [fetchTransactions.fulfilled]: (state, action) => {
      state.pending = false;
      state.transactions = action.payload;
    },
    [fetchTransactions.rejected]: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.error.message;
    },
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
