import React, {FC, useState} from "react";
import {Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterDataInterface} from "../../Interfaces/RegisterDataInterface";
import {useAppDispatch} from "../../store/hooks";
import { useNavigate } from "react-router";
import axios from "../../axios";
import {setAuth} from "../../store/slices/AuthSlice";

const Register: FC = () => {

    const dispatch = useAppDispatch();
    const navigateTo = useNavigate();

    // password and confirmPassword hide-show toggle action Here
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const handleConfirmPassword = () => setConfirmPassword(!showConfirmPassword);

    // for showing some general error message
    const [generalErrorMessage, setGeneralErrorMessage] = useState({error: false, errorMessage: ""});

    const { register, handleSubmit, formState: { errors }, setError } = useForm<RegisterDataInterface>();

    const registerUser: SubmitHandler<RegisterDataInterface> = async (data: RegisterDataInterface) => {
        if(data.password !== data.confirmPassword){
            setError("confirmPassword", {type: "notMatch", message: "Password and Confirm Password must match"});
        }else{
            try {
                const response = await axios.post("/auth/signup", data);
                const token = response.data.access_token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const user = await axios.get('/auth/current-loggedin-user');
                localStorage.setItem('access_token', token);
                dispatch(setAuth(user.data));
                navigateTo("/");

            }catch(e: any){
                if(e.response.data.statusCode === 403){
                    const errorMessages = e.response.data.message;
                    if(errorMessages.includes("email")){
                        setError("email", {type: "exists", message: "Email already exists"});
                    }
                    if(errorMessages.includes("phone")){
                        setError("phone", {type: "exists", message: "Phone already exists"});
                    }
                }else{
                    setGeneralErrorMessage({error: true, errorMessage: "Something unexpected happened. Please Try again."});
                }
            }
        }
    }

    return (
        <div className="register-name">
            <Text my="10px" textAlign="center" fontWeight="bold" fontSize="3em">Enter Your Name</Text>
            <Box rounded="md" boxShadow="sm" p ="20px" w = "50%" mx="auto" >
                {generalErrorMessage.error &&
                    <Text my="20px" color="red.500" textAlign="center" >{generalErrorMessage.errorMessage}</Text>
                }
                <form onSubmit={handleSubmit(registerUser)}>
                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='first-name'>First Name</FormLabel>
                        <Input {...register("firstName")} id='first-name' type='text' />
                    </FormControl>
                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='last-name'>Last Name</FormLabel>
                        <Input {...register("lastName")} id='last-name' type='text' />
                    </FormControl>
                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input {...register("email")} id='email' type='email' />
                        {errors.email &&
                            <Text color="red.500" my="10px">{errors.email.message}</Text>
                        }
                    </FormControl>
                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='phone'>Phone</FormLabel>
                        <Input {...register("phone")}  id='phone' type='text' />
                        {errors.phone &&
                            <Text color="red.500" my="10px">{errors.phone.message}</Text>
                        }
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
                        {errors.confirmPassword &&
                            <Text fontSize="14px" color="red.500">{errors.confirmPassword.message}</Text>
                        }

                    </FormControl>
                    <Box mt="20px" display="flex" justifyContent="flex-end">
                        <Button type="submit" colorScheme='blue'>Next</Button>
                    </Box>
                </form>
            </Box>
        </div>
    )
}

export default Register;
