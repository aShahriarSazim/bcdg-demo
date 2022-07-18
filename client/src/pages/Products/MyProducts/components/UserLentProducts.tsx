import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {Box, Text} from "@chakra-ui/react";
import ProductInterface from "../../../../store/slices/ProductSlice/Interfaces/Product/productInterface";
import ProductCard from "../../components/ProductCard";
import {getUserLentProducts} from "../../../../store/slices/ProductSlice/UserLentProducts";

const UserLentProducts: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    const userLentProducts = useAppSelector(state => state.userLentProducts);

    useEffect(() => {
        dispatch(getUserLentProducts({userId: auth.user.id}));
    }, []);
    if(userLentProducts.loading){
        return (
            <Text>Loading....</Text>
        )
    }else {
        return (
            <Box py="20px" px="20px">
                <Text textAlign="center" fontSize="44px" fontWeight="bold">My Lent Products</Text>
                <Box my="20px">
                    {userLentProducts.data.length === 0 &&
                        <Text textAlign={'center'}>Haven't lent any products yet.</Text>
                    }
                    {userLentProducts.data.map((product: ProductInterface, index) => {
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

export default UserLentProducts;
