import {FC, useEffect, useState} from "react";
import {Box, Button, Text} from "@chakra-ui/react";
import ProductInterface from "../../../store/slices/ProductSlice/Interfaces/Product/productInterface";
import axios from "../../../axios";
import Product from "../components/Product";
import {useAppSelector} from "../../../store/hooks";
import {Link, useNavigate} from "react-router-dom";

const MyProducts: FC = () => {
    const auth = useAppSelector(state => state.auth);
    const myProducts = useAppSelector(state => state.products).filter(
        product => product.user.email === auth.email
    );
    return (
        <Box py="20px" px="20px">
            <Text textAlign="center" fontSize="44px" fontWeight="bold">My Products</Text>
            <Box px={`20px`} mt="20px" width={`750px`} mx={'auto'}>
                <Link to={`/products/create`}>
                    <Button colorScheme={`green`}> Create New Product</Button>
                </Link>
            </Box>
            <Box my="20px" >
                {myProducts.map((product: ProductInterface, index) => {
                    if(product.user.email === auth.email){
                        return(
                            <Box key={index} p="20px" mx="auto" width="750px">
                                <Product {...product} />
                            </Box>
                        )
                    }
                })}
            </Box>
        </Box>
    )
}

export default MyProducts;
