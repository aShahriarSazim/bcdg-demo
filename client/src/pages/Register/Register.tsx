import React, {FC, useState} from "react";
import {useAppSelector, useAppDispatch} from "../../store/hooks";
import UserInterface from "../../Interfaces/UserInterface";

import { useForm, SubmitHandler } from "react-hook-form";
import {setAuth} from "../../store/slices/AuthSlice";

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const Register: FC = (props: any) => {

    // password and confirmPassword hide-show toggle action Here
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const handleConfirmPassword = () => setConfirmPassword(!showConfirmPassword);

    let navigateTo = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<UserInterface>();

    const dispatch = useAppDispatch();

    const registerUser: SubmitHandler<UserInterface> = (data) => {
        dispatch(setAuth(data));
        navigateTo("/");
    }

    return (
        <div className="register">
            <Box rounded="md" boxShadow="sm" p ="20px" w = "50%" mx="auto" >
                <Text my="10px" textAlign="center" fontWeight="bold" fontSize="3em">Register Account</Text>
                <form onSubmit={handleSubmit(registerUser)}>
                    <Box display="flex" justifyContent="space-between">
                        <FormControl w="48%" my="10px" isRequired>
                            <FormLabel htmlFor='first-name'>First Name</FormLabel>
                            <Input {...register("firstName")} id='first-name' type='text' />
                        </FormControl>
                        <FormControl w="48%" my="10px" isRequired>
                            <FormLabel htmlFor='last-name'>Last Name</FormLabel>
                            <Input {...register("lastName")} id='last-name' type='text' />
                        </FormControl>
                    </Box>
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
                    <FormControl my="20px" isRequired>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                {...register("password")}
                                type={showPassword ? 'text' : 'password'}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleShowPassword}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <FormControl my="20px" isRequired>
                        <FormLabel htmlFor='confirm-password'>Confirm Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                {...register("confirmPassword")}
                                pr='4.5rem'
                                type={showConfirmPassword ? 'text' : 'password'}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleConfirmPassword}>
                                    {showConfirmPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Stack align="center">
                        <Button type="submit" colorScheme='blue'>Register</Button>
                    </Stack>
                </form>
            </Box>
        </div>
    )
}

export default Register;