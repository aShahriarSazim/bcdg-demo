import {FC, useEffect, useState} from "react";
import {useNavigate, Link, useParams} from "react-router-dom";
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text, useDisclosure
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import axios from "../../../axios";
import {removeProduct} from "../../../store/slices/ProductSlice";

const ViewProduct: FC = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
    // @ts-ignore
    let product = useAppSelector(state => state.products.find(product => (product.id == parseInt(id))));
    let categories = '';
    if(product){
        categories = product.categories.map(category => {
            return category.category.name;
        }).join(', ');
    }
    const navigateTo = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const deleteProduct = async () => {
        if(product){
            const deletedProduct = await axios.post(`/products/delete/${product.id}`);
            dispatch(removeProduct(deletedProduct.data.id));
        }
        navigateTo("/products/my");
    }
    useEffect(() => {
        if(!product){
            navigateTo("/products/my");
        }
    }, []);
    return (
        <Box my={10} mx={20}>
            {auth.isAuthenticated && product && auth.email === product.user.email && (
                <Text textAlign={`right`}>
                    <Link to={`/products/${product.id}/edit`}>
                        <Button colorScheme="blue" mr={4}>Edit</Button>
                    </Link>
                    <Button colorScheme="red" onClick={onOpen} >Delete</Button>
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
                </Text>
            )}
            {product &&
                <>
                    <Text textAlign={`left`} fontWeight={`bold`} fontSize={40}>{product.title}</Text>
                    <Text textAlign={`left`} fontSize="15px" color="gray.500">Categories: {categories} </Text>
                    <Text textAlign={`left`} fontSize="15px" color="gray.500">Price: ${ product.price} | Rent: ${product.rent} ({product.rentPaymentPeriod})</Text>
                    <Box mt={10}>
                        {product.description}
                    </Box>
                </>
            }
        </Box>
    )
}

export default ViewProduct;
