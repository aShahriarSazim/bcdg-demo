import React, {FC, useState} from "react";
import {Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Text} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginDataInterface} from "../../Interfaces/AuthenticationInterfaces";
import {useAppDispatch} from "../../store/hooks";
import axios from '../../axios';
import {useNavigate} from "react-router-dom";
import {setAuth} from "../../store/slices/AuthSlice";

const Login: FC = () => {

    const navigateTo = useNavigate();
    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginDataInterface>();


    const loginUser: SubmitHandler<LoginDataInterface> = async (data: LoginDataInterface) => {
        try{
            const response = await axios.post('/auth/signin', data);
            const token = response.data.access_token;

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            try {
                const user = await axios.get('/auth/current-loggedin-user');
                localStorage.setItem('access_token', token);
                dispatch(setAuth(user.data));
                navigateTo("/");
            }catch(e: any){
                if(e.response.data.statusCode === 401){
                    setError("email", {type: "unauthorized", message: e.response.data.message});
                }else{
                    setError("email", {type: "unexpectedError", message: "Something went wrong. Please try again later."});
                }
            }

        }catch(e: any){
            if(e.response.data.statusCode === 403){
                setError("email", {type: "unauthorized", message: e.response.data.message});
            }else{
                setError("email", {type: "unexpectedError", message: "Something went wrong. Please try again later."});
            }
        }
    }
    return (
        <div className="login">
            <Box rounded="md" boxShadow="sm" p ="20px" w = "50%" mx="auto" >
                <Text my="10px" textAlign="center" fontWeight="bold" fontSize="3em">Login Account</Text>
                {errors.email &&
                    <Box my="20px"> <Text fontWeight="bold" color="red.500">{errors.email.message}</Text> </Box>
                }
                <form onSubmit={handleSubmit(loginUser)}>

                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input {...register("email")} id='email' type='email' />
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
                    <Stack align="center">
                        <Button type="submit" colorScheme='blue'>Login</Button>
                    </Stack>
                </form>
            </Box>
        </div>
    )
}

export default Login;
