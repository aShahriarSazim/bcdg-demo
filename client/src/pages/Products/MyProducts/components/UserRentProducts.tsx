import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {Box, Text} from "@chakra-ui/react";
import ProductInterface from "../../../../store/slices/ProductSlice/Interfaces/Product/productInterface";
import ProductCard from "../../components/ProductCard";
import {getUserRentProducts} from "../../../../store/slices/ProductSlice/UserRentProducts";

const UserRentProducts: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    const userRentProducts = useAppSelector(state => state.userRentProducts);

    useEffect(() => {
        dispatch(getUserRentProducts({userId: auth.user.id}));
    }, []);
    if(userRentProducts.loading){
        return (
            <Text>Loading....</Text>
        )
    }else {
        return (
            <Box py="20px" px="20px">
                <Text textAlign="center" fontSize="44px" fontWeight="bold">My Rented Products</Text>
                <Box my="20px">
                    {userRentProducts.data.length === 0 &&
                        <Text textAlign={'center'}>Haven't rented any products yet.</Text>
                    }
                    {userRentProducts.data.map((product: ProductInterface, index) => {
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

export default UserRentProducts;
