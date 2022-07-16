import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {getAllProducts} from "../../../../store/slices/ProductSlice/AllProducts";
import {Box, Button, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import ProductInterface from "../../../../store/slices/ProductSlice/Interfaces/Product/productInterface";
import ProductCard from "../../components/ProductCard";
import { getUserProducts } from "../../../../store/slices/ProductSlice/UserProducts";

const UserProducts: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    const userProducts = useAppSelector(state => state.userProducts);

    useEffect(() => {
        dispatch(getUserProducts({userId: 1}));
        console.log('mounted');
    }, []);
    if(userProducts.loading){
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
                    {userProducts.data.map((product: ProductInterface, index) => {
                        return (
                            <Box key={index} p="20px" mx="auto" width="750px">
                                <ProductCard {...product} />
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        )
    }
}

export default UserProducts;
