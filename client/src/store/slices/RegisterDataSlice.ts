import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    RegisterContactsInterface,
    RegisterDataInterface,
    RegisterNameInterface,
    RegisterPasswordInterface
} from "../../Interfaces/AuthenticationInterfaces";

const EmptyRegisterData: RegisterDataInterface = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
}

const initialState: RegisterDataInterface = EmptyRegisterData;

export const registerDataSlice = createSlice({
    name: 'registerData',
    initialState,
    reducers: {
        setRegisterData: (state, action: PayloadAction<RegisterDataInterface>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.address = action.payload.address;
            state.phone = action.payload.phone;
            state.password = action.payload.password;
            state.confirmPassword = action.payload.confirmPassword;
        },
        setRegisterDataNames: (state, action: PayloadAction<RegisterNameInterface>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        },
        setRegisterDataContacts: (state, action: PayloadAction<RegisterContactsInterface>) => {
            state.address = action.payload.address;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        setRegisterDataPassword: (state, action: PayloadAction<RegisterPasswordInterface>) => {
            state.password = action.payload.password;
            state.confirmPassword = action.payload.confirmPassword;
        },
        clearRegisterData: (state) => EmptyRegisterData,
    }
});

export const { setRegisterData, clearRegisterData, setRegisterDataNames, setRegisterDataContacts, setRegisterDataPassword } = registerDataSlice.actions;
export default registerDataSlice.reducer;