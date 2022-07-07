import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import  ProductInterface  from './Interfaces/Product/productInterface';

const initialState : ProductInterface[]  = [];

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setAllProducts: (state: ProductInterface[], action: PayloadAction<ProductInterface[]>) => {
            state.splice(0, state.length);
            action.payload.forEach(product => {
                state.push(product);
            });
        },
        addProduct: (state: ProductInterface[], action: PayloadAction<ProductInterface>) => {
            state.unshift(action.payload);
        },
        updateProduct: (state: ProductInterface[], action: PayloadAction<ProductInterface>) => {
            const index = state.findIndex(product => product.id === action.payload.id);
            state[index] = action.payload;
        },
        removeProduct: (state: ProductInterface[], action: PayloadAction<number>) => {
            const curr = state.filter(product => product.id !== action.payload);
            state.splice(0, state.length);
            curr.forEach(product => {
                state.push(product);
            })
        }
    }
});

export const {setAllProducts, addProduct, removeProduct, updateProduct} = productSlice.actions;
export default productSlice.reducer;
