import {allProductsInterface} from "../Interfaces/Product";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../../../axios";

const initialState : allProductsInterface  = {
    loading: false,
    success: false,
    error: null,
    data: []
}

export const getUserProducts = createAsyncThunk("userProducts/getUserProducts", async (arg: {userId: number}, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`/products/user/${arg.userId}`);
        return data;
    }catch(error){
        rejectWithValue(error);
    }
});

export const userProductSlice = createSlice({
    name: 'userProducts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUserProducts.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(getUserProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
        });
        builder.addCase(getUserProducts.rejected, (state, action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
    },
    reducers: {
        removeSingleProductFromUserProducts: (state: allProductsInterface, action: PayloadAction<number>) => {
            const newStateData = state.data.filter(product => product.id !== action.payload);
            state.data.splice(0, state.data.length);
            newStateData.forEach(product => state.data.push(product));
        }
    }
});

export const { removeSingleProductFromUserProducts } = userProductSlice.actions;
export default userProductSlice.reducer;
