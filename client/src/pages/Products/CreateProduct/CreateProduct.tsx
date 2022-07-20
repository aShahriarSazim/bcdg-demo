import React, {FC, useEffect, useState} from "react";
import {Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea} from "@chakra-ui/react";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import ProductInterface from "../../../store/slices/ProductSlice/Interfaces/Product/productInterface";

import {
    Select
} from "chakra-react-select";

import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {getProductCategories} from "../../../store/slices/ProductSlice/ProductCategories";
import {productCreate} from "../../../store/slices/ProductSlice/ProductActions";

interface categoryOptions{
    value: number;
    label: string;
}

const CreateProduct: FC = () => {

    const navigateTo = useNavigate();
    const dispatch = useAppDispatch();
    const [inputCategories, setInputCategories] = useState<number[]>([]);
    const [isProductCreated, setIsProductCreated] = useState(false);
    const [generalError, setGeneralError] = useState({error: true, message: ''});

    const productCategories = useAppSelector(state => state.productCategories);
    const productActions = useAppSelector(state => state.productActions);

    const { control, register, handleSubmit, formState: { errors }, setError } = useForm<any>();
    const createProduct : SubmitHandler<ProductInterface> = async (data: ProductInterface) => {

        if(inputCategories.length === 0){
            setError("categories", {type: "required", message: "Please select at least one category"});
        }else{
            let newProduct = {
                title: data.title,
                description: data.description,
                price: parseFloat(String(data.price)),
                categories: inputCategories,
                rent: parseFloat(String(data.rent)),
                rentPaymentPeriod: data.rentPaymentPeriod,
            };
            dispatch(productCreate({product: newProduct}));
            setIsProductCreated(true);
        }
    };
    const categoryInputUpdated = (e: any) => {
        let temporaryCategories: number[] = [];
        e.forEach((category: categoryOptions) => {
            temporaryCategories.push(category.value);
        });
        setInputCategories(temporaryCategories);
    };
    useEffect(() => {
        dispatch(getProductCategories());
    }, []);
    useEffect(()=>{
        if(productActions.productCreate.success && isProductCreated){
            navigateTo("/products/my");
        }else if(productActions.productCreate.error){
            setIsProductCreated(false);
            setGeneralError({error: true, message: productActions.productCreate.error.message});
        }
    }, [productActions, isProductCreated]);
    if(productCategories.loading && !productCategories.success){
        return <div>Loading...</div>;
    }else {
        const categories: categoryOptions[] = productCategories.data.map(category => {
            return {
                value: category.id,
                label: category.name
            }
        });
        return (
            <Box my={10} mx={20}>
                <Text mb={10} fontWeight="bold" fontSize="30px" textAlign={`center`}>Create Product</Text>
                {generalError.error &&
                    <Text textAlign={'center'} color={'red'}>{generalError.message}</Text>
                }
                <form onSubmit={handleSubmit(createProduct)}>
                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='title'>Title</FormLabel>
                        <Input {...register("title")} id='title' type='text'/>
                    </FormControl>
                    <Controller
                        control={control}
                        name="categories"
                        render={({
                                     field: {onChange, onBlur, value, name, ref},
                                     fieldState: {invalid, error}
                                 }) => (
                            <FormControl id="categories">
                                <FormLabel>Select Categories</FormLabel>
                                {errors.categories && errors.categories.type === 'required' &&
                                    <Text color="red.500">Please select at least one category</Text>
                                }
                                <Select
                                    isMulti
                                    name={name}
                                    value={value}
                                    onChange={categoryInputUpdated}
                                    options={categories}
                                    placeholder="Select Categories"
                                />

                                <FormErrorMessage>{error && error.message}</FormErrorMessage>
                            </FormControl>
                        )}
                    />
                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='description'>Description</FormLabel>
                        <Textarea
                            {...register("description")}
                        />
                    </FormControl>
                    <Box display={'flex'} columnGap={'10px'}>
                        <FormControl my="10px" isRequired>
                            <FormLabel htmlFor='price'>Price</FormLabel>
                            <Input {...register("price")} id='price' step="0.00001" type='number'/>
                        </FormControl>
                        <FormControl my="10px" isRequired>
                            <FormLabel htmlFor='rent'>Rent</FormLabel>
                            <Input {...register("rent")} id='rent' step="0.00001" type='number'/>
                        </FormControl>
                        <FormControl my="10px" isRequired>
                            <FormLabel htmlFor='rentPaymentPeriod'>Rent Payment Period</FormLabel>
                            <Input {...register("rentPaymentPeriod")} id='rentPaymentPeriod' type='text'/>
                        </FormControl>
                    </Box>
                    <Text textAlign={'center'} mt={10}>
                        <Button type="submit" colorScheme={'blue'}>Create Product</Button>
                    </Text>
                </form>
            </Box>
        )
    }
}

export default CreateProduct;
