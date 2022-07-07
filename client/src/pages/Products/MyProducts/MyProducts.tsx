import {FC, useEffect} from "react";
import {Box, Button, Text} from "@chakra-ui/react";
import ProductInterface from "../../../store/slices/ProductSlice/Interfaces/Product/productInterface";
import ProductCard from "../components/ProductCard";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Link} from "react-router-dom";
import {getAllProducts} from "../../../store/slices/ProductSlice/AllProducts";

const MyProducts: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
    // I haven't made any api endpoints for userProducts in the backend yet. So, I'm currently taking all products and filtering them by user email. However, after finishing this PR, I will make an api endpoint for userProducts and update this.
    const allProducts = useAppSelector(state => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);
    if(allProducts.loading){
        return (
            <Text>Loading....</Text>
        )
    }else {
        return (
            <Box py="20px" px="20px">
                <Text textAlign="center" fontSize="44px" fontWeight="bold">My Products</Text>
                <Box px={`20px`} mt="20px" width={`750px`} mx={'auto'}>
                    <Link to={`/products/create`}>
                        <Button colorScheme={`green`}> Create New Product</Button>
                    </Link>
                </Box>
                <Box my="20px">
                    {allProducts.data.map((product: ProductInterface, index) => {
                        if (product.user.email === auth.user.email) {
                            return (
                                <Box key={index} p="20px" mx="auto" width="750px">
                                    <ProductCard {...product} />
                                </Box>
                            )
                        }
                    })}
                </Box>
            </Box>
        )
    }
}

export default MyProducts;
