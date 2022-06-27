import {FC, useEffect, useState} from "react";
import {Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterPasswordInterface} from "../../../Interfaces/AuthenticationInterfaces";
import {Link, useNavigate} from "react-router-dom";
import useFormPersist from "react-hook-form-persist";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {
    setRegisterDataContacts,
    setRegisterDataNames,
    setRegisterDataPassword
} from "../../../store/slices/RegisterDataSlice";

const RegisterPassword: FC = () => {
    const navigateTo = useNavigate();
    // password and confirmPassword hide-show toggle action Here
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const handleConfirmPassword = () => setConfirmPassword(!showConfirmPassword);

    const { register, handleSubmit, setValue, watch, formState: { errors }, setError, clearErrors } = useForm<RegisterPasswordInterface>();

    useFormPersist("RegisterPassword", {
        watch,
        setValue,
        storage: window.localStorage,
    });

    const storeRegisterData = useAppSelector(state => state.registerData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!storeRegisterData.email || !storeRegisterData.address || !storeRegisterData.phone) {
            navigateTo("/register/contacts");
        }
        else if (!storeRegisterData.firstName || !storeRegisterData.lastName) {
            navigateTo("/register/name");
        }
    }, []);

    const save: SubmitHandler<RegisterPasswordInterface> = (data: RegisterPasswordInterface) => {
        if(data.password !== data.confirmPassword){
            setError("confirmPassword", {type: "notMatch", message: "Password and Confirm Password must be same"});
            return;
        }
        clearErrors(["password", "confirmPassword"]);
        dispatch(setRegisterDataPassword(data));

        localStorage.removeItem("RegisterPassword");
        localStorage.removeItem("RegisterContacts");
        localStorage.removeItem("RegisterName");

        navigateTo("/");
    }
    return (
        <div className="register-password">
            <Text my="10px" textAlign="center" fontWeight="bold" fontSize="3em">Enter a new password</Text>

            <Box rounded="md" boxShadow="sm" p ="20px" w = "50%" mx="auto" >
                {errors.confirmPassword?
                    <Text color="red.500">{errors.confirmPassword.message}</Text>
                    : null}
                <form onSubmit={handleSubmit(save)}>
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
                    <Box mt="20px" display="flex" justifyContent="space-between">
                        <Link to="/register/contacts">
                            <Button colorScheme='red'>Prev</Button>
                        </Link>
                        <Button type="submit" colorScheme='blue'>Register</Button>
                    </Box>
                </form>
            </Box>
        </div>
    );
}
export default RegisterPassword;