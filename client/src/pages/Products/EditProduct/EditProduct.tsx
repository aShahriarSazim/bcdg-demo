import React, {FC, useEffect, useState} from "react";
import {Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea} from "@chakra-ui/react";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import ProductInterface from "../../../store/slices/ProductSlice/Interfaces/Product/productInterface";

import {
    Select
} from "chakra-react-select";
import axios from "../../../axios";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {updateProduct} from "../../../store/slices/ProductSlice";

interface categoryOptions{
    value: number;
    label: string;
}

const EditProduct: FC = () => {

    const auth = useAppSelector(state => state.auth);
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const navigateTo = useNavigate();

    const [inputCategories, setInputCategories] = useState<number[]>([]);

    const product = useAppSelector(state => state.products.find(product => product.id === parseInt(String(id))));

    // This is temporary for now. I will have to create an api endpoint in the server to grab the catagories.
    const categories: categoryOptions[] = [
        {label: "FPS Games", value: 1},
        {label: "Open World", value: 2},
        {label: "Multiplayer", value: 3}
    ];

    const { control, register, handleSubmit, formState: { errors }, setError, setValue } = useForm<any>();
    const editProduct : SubmitHandler<ProductInterface> = async (data: ProductInterface) => {
        if(inputCategories.length === 0){
            setError("categories", {type: "required", message: "Please select at least one category"});
        }else{
            let productToBeUpdated = {
                title: data.title,
                description: data.description,
                price: parseFloat(String(data.price)),
                categories: inputCategories,
                rent: parseFloat(String(data.rent)),
                rentPaymentPeriod: data.rentPaymentPeriod,
            };
            const response = await axios.post(`/products/update/${id}`, productToBeUpdated);
            const updatedProduct = response.data;
            dispatch(updateProduct(updatedProduct));
            navigateTo('/products/my');
        }
    };
    const categoryInputUpdated = (e: any) => {
        let temp: number[] = [];
        e.forEach((category: categoryOptions) => {
            temp.push(category.value);
        });
        setInputCategories(temp);
    };
    useEffect(() => {
        if(product){
            if(product.user.email !== auth.email){
                navigateTo('/products/my');
            }
            setValue("title", product.title);
            setValue("description", product.description);
            setValue("price", product.price);
            setValue("rent", product.rent);
            setValue("rentPaymentPeriod", product.rentPaymentPeriod);

            let temp: number[] = [];
            product.categories.forEach(({category}) => {
                temp.push(category.id);
            });
            setInputCategories(temp);
        }
    }, []);
    if(product){
        return (
            <Box my={10} mx={20}>
                <Text mb={10} fontWeight="bold" fontSize="30px" textAlign={`center`}>Edit Product</Text>
                <form onSubmit={handleSubmit(editProduct)}>
                    <FormControl my="10px" isRequired>
                        <FormLabel htmlFor='title'>Title</FormLabel>
                        <Input  {...register("title")} id='title' type='text' />
                    </FormControl>
                    <Controller
                        control={control}
                        name="categories"
                        render={({
                                     field: { onChange, onBlur, value , name, ref },
                                     fieldState: { invalid, error }
                                 }) => (
                            <FormControl id="categories" >
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
                                    defaultValue={product.categories.map(({category}) => {
                                        return {value: category.id, label: category.name}
                                    })}
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
                            <Input  {...register("price")} id='price' step="0.00001" type='number' />
                        </FormControl>
                        <FormControl my="10px" isRequired>
                            <FormLabel htmlFor='rent'>Rent</FormLabel>
                            <Input  {...register("rent")} id='rent' step="0.00001" type='number' />
                        </FormControl>
                        <FormControl my="10px" isRequired>
                            <FormLabel htmlFor='rentPaymentPeriod'>Rent Payment Period</FormLabel>
                            <Input {...register("rentPaymentPeriod")} id='rentPaymentPeriod' type='text' />
                        </FormControl>
                    </Box>
                    <Text textAlign={'center'} mt={10}>
                        <Button type="submit" colorScheme={'blue'}>Update Product</Button>
                    </Text>
                </form>
            </Box>
        )
    }else{
        return <Box>Loading...</Box>
    }
}

export default EditProduct;
