import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice/AuthSlice';
import AllProducts from './slices/ProductSlice/AllProducts/AllProducts';
import ProductById from "./slices/ProductSlice/ProductById/ProductById";
import userProductSlice from "./slices/ProductSlice/UserProducts/UserProducts";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        products: AllProducts,
        userProducts: userProductSlice,
        product: ProductById,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
