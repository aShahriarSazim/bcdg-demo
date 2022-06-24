import React, {FC, useState} from "react";
import {Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Text} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import LoginDataInterface from "../../Interfaces/LoginDataInterface";

const Login: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginDataInterface>();
    const loginUser: SubmitHandler<LoginDataInterface> = (data) => {
        console.log(data);
    }
    return (
        <div className="login">
            <Box rounded="md" boxShadow="sm" p ="20px" w = "50%" mx="auto" >
                <Text my="10px" textAlign="center" fontWeight="bold" fontSize="3em">Login Account</Text>
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