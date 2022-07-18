import {allProductsInterface} from "../Interfaces/Product";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../../../axios";

const initialState : allProductsInterface  = {
    loading: false,
    success: false,
    error: null,
    data: []
}

export const getUserLentProducts = createAsyncThunk("userLentProducts/getUserLentProducts", async (arg: {userId: number}, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`/products/user/${arg.userId}/lent`);
        return data;
    }catch(error){
        rejectWithValue(error);
    }
});

export const userLentProductSlice = createSlice({
    name: 'userLentProducts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUserLentProducts.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(getUserLentProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
        });
        builder.addCase(getUserLentProducts.rejected, (state, action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
    },
    reducers: {
        removeSingleProductFromUserLentProducts: (state: allProductsInterface, action: PayloadAction<number>) => {
            const newStateData = state.data.filter(product => product.id !== action.payload);
            state.data.splice(0, state.data.length);
            newStateData.forEach(product => state.data.push(product));
        }
    }
});

export const { removeSingleProductFromUserLentProducts } = userLentProductSlice.actions;
export default userLentProductSlice.reducer;
