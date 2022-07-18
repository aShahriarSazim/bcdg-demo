import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {Box, Text} from "@chakra-ui/react";
import ProductInterface from "../../../../store/slices/ProductSlice/Interfaces/Product/productInterface";
import ProductCard from "../../components/ProductCard";
import {getUserSoldProducts} from "../../../../store/slices/ProductSlice/UserSoldProducts";

const UserSoldProducts: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    const userSoldProducts = useAppSelector(state => state.userSoldProducts);

    useEffect(() => {
        dispatch(getUserSoldProducts({userId: auth.user.id}));
    }, []);
    if(userSoldProducts.loading){
        return (
            <Text>Loading....</Text>
        )
    }else {
        return (
            <Box py="20px" px="20px">
                <Text textAlign="center" fontSize="44px" fontWeight="bold">My Sold Products</Text>
                <Box my="20px">
                    {userSoldProducts.data.length === 0 &&
                        <Text textAlign={'center'}>Haven't Sold any products yet.</Text>
                    }
                    {userSoldProducts.data.map((product: ProductInterface, index) => {
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

export default UserSoldProducts;
