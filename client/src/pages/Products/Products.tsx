import {FC, useEffect, useState} from "react";
import ProductInterface from "../../store/slices/ProductSlice/Interfaces/Product/productInterface";
import axios from "../../axios";
import {Box, Text} from "@chakra-ui/react";
import Product from "./components/Product";
import {useAppSelector} from "../../store/hooks";

const Products: FC = () => {

    const allProducts = useAppSelector(state => state.products);

    useEffect(() => {
    }, []);

    return (
        <Box py="20px" px="20px">
            <Text textAlign="center" fontSize="44px" fontWeight="bold">All Products</Text>
            <Box my="20px" >
                {allProducts.map((product: ProductInterface, index) => {
                   return(
                   <Box key={index} p="20px" mx="auto" width="750px">
                       <Product {...product} />
                   </Box>)
                })}
            </Box>
        </Box>
    )
}

export default Products;
