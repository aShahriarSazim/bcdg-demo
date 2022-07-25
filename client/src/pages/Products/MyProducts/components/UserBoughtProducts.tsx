import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {Box, Text} from "@chakra-ui/react";
import ProductInterface from "../../../../store/slices/ProductSlice/Interfaces/Product/productInterface";
import ProductCard from "../../components/ProductCard";
import {getUserBoughtProducts} from "../../../../store/slices/ProductSlice/UserBoughtProducts";

const UserBoughtProducts: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    const userBoughtProducts = useAppSelector(state => state.userBoughtProducts);

    useEffect(() => {
        dispatch(getUserBoughtProducts({userId: auth.user.id}));
    }, []);
    if(userBoughtProducts.loading){
        return (
            <Text>Loading....</Text>
        )
    }else {
        return (
            <Box py="20px" px="20px">
                <Text textAlign="center" fontSize="44px" fontWeight="bold">My Bought Products</Text>
                <Box my="20px">
                    {userBoughtProducts.data.length === 0 &&
                        <Text textAlign={'center'}>Haven't bought any products yet.</Text>
                    }
                    {userBoughtProducts.data.map((product: ProductInterface, index) => {
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

export default UserBoughtProducts;
