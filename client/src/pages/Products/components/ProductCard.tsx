import {DeleteIcon} from "@chakra-ui/icons";
import {Link, useNavigate} from "react-router-dom";
import ProductInterface from "../../../store/slices/ProductSlice/Interfaces/Product/productInterface";
import {FC} from "react";

import {
    Box,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button,
} from '@chakra-ui/react'
import axios from "../../../axios";
import {useAppSelector} from "../../../store/hooks";

const Product: FC<ProductInterface> = (product: ProductInterface): JSX.Element => {

    const navigateTo = useNavigate();
    const auth = useAppSelector(state => state.auth);

    const categories = product.categories.map(category => {
        return category.category.name;
    }).join(", ");


    const { isOpen, onOpen, onClose } = useDisclosure();
    const deleteProduct = async () => {
        const deletedProduct  = await axios.post(`/products/delete/${product.id}`);
        onClose();
        navigateTo("/products/");
    }
    return (

        <Box border="2px" borderColor="gray.200" p="20px" position="relative">

            {auth.isAuthenticated && auth.email === product.user.email && (
                <>
                    <DeleteIcon cursor="pointer" position="absolute" right="3" top="3" zIndex={2} onClick={onOpen} />
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Delete Product?</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                If you delete the product, the product will be removed from the database and you will never get this product back
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='red' mr={2} onClick={deleteProduct}>
                                    Delete
                                </Button>
                                <Button colorScheme='blue' onClick={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>)
            }
            <Box mt="5px">
                <Link to={`/products/view/${product.id}`} >
                    <Text fontWeight="bold" fontSize="20px">{product.title}</Text>
                    <Text fontSize="12px" color="gray.500">Categories: {categories} </Text>
                    <Text fontSize="12px" color="gray.500">Price: ${product.price} | Rent: ${product.rent} ({product.rentPaymentPeriod})</Text>
                    <Text mt="20px">
                        {product.description}
                    </Text>
                </Link>
            </Box>
        </Box>
    )
}

export default Product;