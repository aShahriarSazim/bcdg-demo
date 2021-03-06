import React, {FC, useEffect, useState} from "react";
import {Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea} from "@chakra-ui/react";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import ProductInterface from "../../../store/slices/ProductSlice/Interfaces/Product/productInterface";

import {
    Select
} from "chakra-react-select";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {getProductById} from "../../../store/slices/ProductSlice/ProductById";
import {getProductCategories} from "../../../store/slices/ProductSlice/ProductCategories";
import {updateProduct} from "../../../store/slices/ProductSlice/ProductActions";

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
    const [isProductUpdated, setIsProductUpdated] = useState(false);

    const product = useAppSelector(state => state.product);
    const productActions = useAppSelector(state => state.productActions);
    const productCategories = useAppSelector(state => state.productCategories);

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
            dispatch(updateProduct({id: parseInt(String(id)), product: productToBeUpdated}));
            setIsProductUpdated(true);
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
        dispatch(getProductById({id: parseInt(String(id))}));
        if(product.error){
            navigateTo("/");
        }
        if(product.data){
            if(product.data.user.email !== auth.user.email){
                navigateTo('/products/my');
            }
            setValue("title", product.data.title);
            setValue("description", product.data.description);
            setValue("price", product.data.price);
            setValue("rent", product.data.rent);
            setValue("rentPaymentPeriod", product.data.rentPaymentPeriod);

            let temp: number[] = [];
            product.data.categories.forEach(({category}) => {
                temp.push(category.id);
            });
            setInputCategories(temp);
        }
    }, []);
    useEffect(()=> {
        dispatch(getProductCategories());
    }, []);

    useEffect(() => {
        if(productActions.updateProduct.success && isProductUpdated){
            navigateTo('/products/my');
        }
    }, [productActions, isProductUpdated]);

    if(productCategories.loading && !productCategories.success || !product.data){
        return <div>Loading...</div>;
    }
    else if(product.data){
        const categories: categoryOptions[] = productCategories.data.map(category => {
            return {
                value: category.id,
                label: category.name
            }
        });
        const existingCategories = product.data.categories;
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
                                    defaultValue={existingCategories.map(({category}) => {
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
