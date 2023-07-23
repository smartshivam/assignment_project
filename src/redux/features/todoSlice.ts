import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  allTodos: any;
}

const initialState: TodoState = {
  allTodos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<any>) => {
      state.allTodos = action.payload;
    },
  },
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;
