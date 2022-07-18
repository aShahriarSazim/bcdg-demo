import {FC, useEffect} from "react";
import ProductInterface from "../../store/slices/ProductSlice/Interfaces/Product/productInterface";
import {Box, Text} from "@chakra-ui/react";
import ProductCard from "./components/ProductCard";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getAllProducts} from "../../store/slices/ProductSlice/AllProducts";


const Products: FC = () => {

    const dispatch = useAppDispatch();
    const allProducts = useAppSelector(state => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    if(allProducts.loading){
        return (
            <Text>Loading....</Text>
        )
    }else{
        return (
            <Box py="20px" px="20px">
                <Text textAlign="center" fontSize="44px" fontWeight="bold">All Products</Text>
                <Box my="20px" >
                    {allProducts.data.map((product: ProductInterface, index) => {
                        return(
                            <Box key={index} p="20px" mx="auto" width="750px">
                                <ProductCard {...product} />
                            </Box>)
                    })}
                </Box>
            </Box>
        )
    }
}

export default Products;
