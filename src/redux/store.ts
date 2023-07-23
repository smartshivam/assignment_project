import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { configureStore ,ThunkAction,Action} from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import todoSlice from './features/todoSlice';
export const store = configureStore({
  reducer: {
    authReducer,
    todoSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState>= useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;