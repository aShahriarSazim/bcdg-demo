import {FC, useEffect} from "react";
import {Box, Button, FormControl, FormLabel, Input, Text} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterContactsInterface} from "../../../Interfaces/AuthenticationInterfaces";
import {Link, useNavigate} from "react-router-dom";

import useFormPersist from 'react-hook-form-persist';
import {useAppSelector, useAppDispatch} from "../../../store/hooks";
import {
    setRegisterDataContacts,
    setRegisterDataNames,
    setRegisterDataPassword
} from "../../../store/slices/RegisterDataSlice";

const RegisterContacts: FC = () => {
    const navigateTo = useNavigate();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<RegisterContactsInterface>();

    useFormPersist("RegisterContacts", {
        watch,
        setValue,
        storage: window.localStorage,
    });
    const storeRegisterData = useAppSelector(state => state.registerData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!storeRegisterData.firstName || !storeRegisterData.lastName) {
            navigateTo("/register/name");
        }
    }, []);

    const save: SubmitHandler<RegisterContactsInterface> = (data: RegisterContactsInterface) => {
        dispatch(setRegisterDataContacts(data));
        navigateTo("/register/password");
    }
    return (
        <div className="register-contacts">
            <Text my="10px" textAlign="center" fontWeight="bold" fontSize="3em">Contact Information</Text>
            <Box rounded="md" boxShadow="sm" p ="20px" w = "50%" mx="auto" >
                <form onSubmit={handleSubmit(save)}>
                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input {...register("email")} id='email' type='email' />
                    </FormControl>
                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='phone'>Phone</FormLabel>
                        <Input {...register("phone")}  id='phone' type='text' />
                    </FormControl>
                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='address'>Address</FormLabel>
                        <Input {...register("address")}  id='address' type='text' />
                    </FormControl>
                    <Box mt="20px" display="flex" justifyContent="space-between">
                        <Link to="/register/name">
                            <Button colorScheme='red'>Prev</Button>
                        </Link>
                        <Button type="submit" colorScheme='blue'>Next</Button>
                    </Box>
                </form>
            </Box>
        </div>
    );
}

export default RegisterContacts;