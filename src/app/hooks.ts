import { AppDispatch, AppState } from "@/reducers/store";
import { ThunkAction } from "@reduxjs/toolkit";
import { UnknownAsyncThunkAction } from "@reduxjs/toolkit/dist/matchers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, UnknownAsyncThunkAction>;
