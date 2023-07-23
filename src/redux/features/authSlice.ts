import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: any;
  isLoading: Boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
