import {Link} from "react-router-dom";
import ProductInterface from "../../../store/slices/ProductSlice/Interfaces/Product/productInterface";
import {FC} from "react";

import {
    Box,
    Text,
} from '@chakra-ui/react'
import {useAppSelector} from "../../../store/hooks";
import DeleteProduct from "./DeleteProduct";

const ProductCard: FC<ProductInterface> = (product: ProductInterface): JSX.Element => {

    const auth = useAppSelector(state => state.auth);
    const categories = product.categories.map(category => {
        return category.category.name;
    }).join(", ");

    return (
        <Box border="2px" borderColor="gray.200" p="20px" position="relative">
            {auth.isAuthenticated && auth.user.email === product.user.email && (
                <Box position={'absolute'} right={0} top={0} m={2}>
                    <DeleteProduct id={product.id} afterDelete={'removeProductFromRedux'}/>
                </Box>
            )}
            <Box mt="5px">
                <Link to={`/products/view/${product.id}`} >
                    <Text fontWeight="bold" fontSize="20px">{product.title}</Text>
                    <Text fontSize="12px" color="gray.500">Categories: {categories} </Text>
                    <Text fontSize="12px" color="gray.500">Price: ${product.price} | Rent: ${product.rent} ({product.rentPaymentPeriod})</Text>
                    <Text mt="20px">
                        {product.description}
                    </Text>
                    <Text textAlign={'right'} fontSize={'13px'} color={'gray.500'} mt={5}>
                        {product.views} views
                    </Text>
                </Link>
            </Box>
            {product.isSold &&
                <Text left={0} bottom={0} position={'absolute'} color={'white'} fontSize={'11px'} as={'span'} mt={5} bg={'teal'} p={1}>
                    sold
                </Text>
            }
        </Box>
    )
}
export default ProductCard;
