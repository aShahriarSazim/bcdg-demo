import {FC} from "react";
import ProductInterface from "../../../../store/slices/ProductSlice/Interfaces/Product/productInterface";
import {Box, Button, useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import axios from "../../../../axios";
import {useNavigate} from "react-router-dom";

const BuyProduct: FC<ProductInterface> = (product: ProductInterface): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigateTo = useNavigate();
    const buyProduct = async () => {
        const boughtProduct = await axios.post(`/products/buy/${product.id}`);
        onClose();
        navigateTo('/products/my');
    }
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Buy This product?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Do you want to buy this product?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='purple' mr={3} onClick={buyProduct}>
                            Buy
                        </Button>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box textAlign={'right'}>
                <Button onClick={onOpen} colorScheme="purple" w={'150px'} mt={4}>Buy Product</Button>
            </Box>
        </div>
    )
}

export default BuyProduct;
