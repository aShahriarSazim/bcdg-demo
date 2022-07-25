import {allProductsInterface} from "../Interfaces/Product";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../../../axios";

const initialState : allProductsInterface  = {
    loading: false,
    success: false,
    error: null,
    data: []
}

export const getUserBoughtProducts = createAsyncThunk("userBoughtProducts/getUserBoughtProducts", async (arg: {userId: number}, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`/products/user/${arg.userId}/bought`);
        return data;
    }catch(error){
        rejectWithValue(error);
    }
});

export const userBoughtProductSlice = createSlice({
    name: 'userBoughtProducts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUserBoughtProducts.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(getUserBoughtProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
        });
        builder.addCase(getUserBoughtProducts.rejected, (state, action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
    },
    reducers: {
        removeSingleProductFromUserBoughtProducts: (state: allProductsInterface, action: PayloadAction<number>) => {
            const newStateData = state.data.filter(product => product.id !== action.payload);
            state.data.splice(0, state.data.length);
            newStateData.forEach(product => state.data.push(product));
        }
    }
});

export const { removeSingleProductFromUserBoughtProducts } = userBoughtProductSlice.actions;
export default userBoughtProductSlice.reducer;
