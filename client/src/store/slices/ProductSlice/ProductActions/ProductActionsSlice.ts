import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../../axios";
import {AxiosError} from "axios";

interface productActions{
    productCreate: {
        loading: boolean;
        success: boolean;
        error: any;
    }
    updateProduct: {
        loading: boolean;
        success: boolean;
        error: any;
    }
    deleteProduct: {
        loading: boolean;
        success: boolean;
        error: any;
    }
    incrementProductViews: {
        loading: boolean;
        success: boolean;
        error: any;
    }
    buyProduct: {
        loading: boolean;
        success: boolean;
        error: any;
    }
    rentProduct: {
        loading: boolean;
        success: boolean;
        error: any;
    }
}

const defaultState: productActions = {
    productCreate: {
        loading: false,
        success: false,
        error: null
    },
    updateProduct: {
        loading: false,
        success: false,
        error: null
    },
    deleteProduct: {
        loading: false,
        success: false,
        error: null
    },
    buyProduct: {
        loading: false,
        success: false,
        error: null
    },
    incrementProductViews: {
        loading: false,
        success: false,
        error: null
    },
    rentProduct: {
        loading: false,
        success: false,
        error: null
    }
};

const initialState = defaultState;

export const productCreate = createAsyncThunk('productActions/createProduct', async (args: {product: any}, {rejectWithValue}) => {
    try {
        const {data} = await axios.post('/products/create', args.product);
        return data;
    }catch(error){
        const axiosError = error as AxiosError;
        return rejectWithValue(axiosError.response?.data);
    }
});

export const updateProduct = createAsyncThunk('productActions/updateProduct', async (args: {id: number, product: any}, {rejectWithValue}) => {
    try {
        const {data} = await axios.post(`/products/update/${args.id}`, args.product);
        return data;
    }catch(error){
        const axiosError = error as AxiosError;
        return rejectWithValue(axiosError.response?.data);
    }
});

export const deleteProduct = createAsyncThunk('productActions/deleteProduct', async (args: {id: number}, {rejectWithValue}) => {
    try {
        const {data} = await axios.delete(`/products/delete/${args.id}`);
        return data;
    }catch(error){
        const axiosError = error as AxiosError;
        return rejectWithValue(axiosError.response?.data);
    }
});

export const incrementProductView = createAsyncThunk('productActions/incrementView', async (args: {id: number}, {rejectWithValue}) => {
    try{
        const {data} = await axios.post(`/products/increment/views/${args.id}`);
        return data;
    }catch(error){
        const axiosError = error as AxiosError;
        return rejectWithValue(axiosError.response?.data);
    }
});

export const buyProduct = createAsyncThunk('productActions/buyProduct', async (args: {id: number}, {rejectWithValue}) => {
    try{
        const {data} = await axios.post(`/products/buy/${args.id}`);
        return data;
    }catch(error){
        const axiosError = error as AxiosError;
        return rejectWithValue(axiosError.response?.data);
    }
});
export const rentProduct = createAsyncThunk('productActions/rentProduct', async (args: {id: number, from: any, to: any}, {rejectWithValue}) => {
    try{
        const {data} = await axios.post(`/products/rent/${args.id}`, {from: args.from, to: args.to});
        return data;
    }catch(error){
        const axiosError = error as AxiosError;
        return rejectWithValue(axiosError.response?.data);
    }
});

const productActionSlice = createSlice({
    name: 'productActions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(productCreate.pending, (state, action) => {
            state.productCreate.loading = true;
            state.productCreate.success = false;
            state.productCreate.error = null;
        });
        builder.addCase(productCreate.fulfilled, (state, action) => {
            state.productCreate.loading = false;
            state.productCreate.success = true;
        });
        builder.addCase(productCreate.rejected, (state, action) => {
            state.productCreate.loading = false;
            state.productCreate.success = false;
            state.productCreate.error = action.payload;
        });
        builder.addCase(updateProduct.pending, (state, action) => {
            state.updateProduct.loading = true;
            state.updateProduct.success = false;
            state.updateProduct.error = null;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.updateProduct.loading = false;
            state.updateProduct.success = true;
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.updateProduct.loading = false;
            state.updateProduct.success = false;
            state.updateProduct.error = action.payload;
        });
        builder.addCase(deleteProduct.pending, (state, action) => {
            state.deleteProduct.loading = true;
            state.deleteProduct.success = false;
            state.deleteProduct.error = null;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.deleteProduct.loading = false;
            state.deleteProduct.success = true;
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.deleteProduct.loading = false;
            state.deleteProduct.success = false;
            state.deleteProduct.error = action.payload;
        });
        builder.addCase(incrementProductView.pending, (state, action) => {
            state.incrementProductViews.loading = true;
            state.incrementProductViews.success = true;
        });
        builder.addCase(incrementProductView.fulfilled, (state, action) => {
            state.incrementProductViews.loading = false;
            state.incrementProductViews.success = true;
        });
        builder.addCase(incrementProductView.rejected, (state, action) => {
            state.incrementProductViews.loading = false;
            state.incrementProductViews.success = false;
            state.incrementProductViews.error = action.payload;
        });

        builder.addCase(buyProduct.pending, (state, action) => {
            state.buyProduct.loading = true;
            state.buyProduct.success = false;
            state.buyProduct.error = null;
        });
        builder.addCase(buyProduct.fulfilled, (state, action) => {
            state.buyProduct.loading = false;
            state.buyProduct.success = true;
        });
        builder.addCase(buyProduct.rejected, (state, action) => {
            state.buyProduct.loading = false;
            state.buyProduct.success = false;
            state.buyProduct.error = action.payload;
        });
        builder.addCase(rentProduct.pending, (state, action) => {
            state.rentProduct.loading = true;
            state.rentProduct.success = false;
            state.rentProduct.error = null;
        });
        builder.addCase(rentProduct.fulfilled, (state, action) => {
            state.rentProduct.loading = false;
            state.rentProduct.success = true;
        });
        builder.addCase(rentProduct.rejected, (state, action) => {
            state.rentProduct.loading = false;
            state.rentProduct.success = false;
            state.rentProduct.error = action.payload;
        });
    }
});

export default productActionSlice.reducer;
