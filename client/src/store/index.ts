import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice/AuthSlice';
import AllProducts from './slices/ProductSlice/AllProducts/AllProducts';
import ProductById from "./slices/ProductSlice/ProductById/ProductById";
import userProductSlice from "./slices/ProductSlice/UserProducts/UserProducts";
import UserRentProductSlice from "./slices/ProductSlice/UserRentProducts/UserRentProducts";
import UserLentProductSlice from "./slices/ProductSlice/UserLentProducts/UserLentProducts";
import UserSoldProductSlice from "./slices/ProductSlice/UserSoldProducts/UserSoldProducts";
import UserBoughtProductSlice from "./slices/ProductSlice/UserBoughtProducts/UserBoughtProducts";
import ProductCategories from "./slices/ProductSlice/ProductCategories/ProductCategories";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        products: AllProducts,
        userProducts: userProductSlice,
        userRentProducts: UserRentProductSlice,
        userLentProducts: UserLentProductSlice,
        userSoldProducts: UserSoldProductSlice,
        userBoughtProducts: UserBoughtProductSlice,
        productCategories: ProductCategories,
        product: ProductById,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
