import {FC, useEffect} from "react";
import {Box, Button, FormControl, FormLabel, Input, Text} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterNameInterface} from "../../../Interfaces/AuthenticationInterfaces";
import {useNavigate} from "react-router-dom";

import useFormPersist from 'react-hook-form-persist';

import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {
    setRegisterDataNames,
} from "../../../store/slices/RegisterDataSlice";

const RegisterName: FC = () => {

    const navigateTo = useNavigate();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<RegisterNameInterface>();

    useFormPersist("RegisterName", {
        watch,
        setValue,
        storage: window.localStorage,
    });

    const dispatch = useAppDispatch();

    const save: SubmitHandler<RegisterNameInterface> = (data: RegisterNameInterface) => {
        dispatch(setRegisterDataNames(data));
        navigateTo("/register/contacts");
    }

    useEffect(() => {

    }, []);

    return (
        <div className="register-name">
            <Text my="10px" textAlign="center" fontWeight="bold" fontSize="3em">Enter Your Name</Text>
            <Box rounded="md" boxShadow="sm" p ="20px" w = "50%" mx="auto" >
                <form onSubmit={handleSubmit(save)}>
                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='first-name'>First Name</FormLabel>
                        <Input {...register("firstName")} id='first-name' type='text' />
                    </FormControl>
                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='last-name'>Last Name</FormLabel>
                        <Input {...register("lastName")} id='last-name' type='text' />
                    </FormControl>
                    <Box mt="20px" display="flex" justifyContent="flex-end">
                        <Button type="submit" colorScheme='blue'>Next</Button>
                    </Box>
                </form>
            </Box>
        </div>
    );
}

export default RegisterName;