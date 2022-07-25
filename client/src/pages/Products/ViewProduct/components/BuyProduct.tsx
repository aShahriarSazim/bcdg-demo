import {FC, useEffect, useState} from "react";
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
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import { buyProduct } from "../../../../store/slices/ProductSlice/ProductActions";

const BuyProduct: FC<ProductInterface> = (product: ProductInterface): JSX.Element => {
    const dispatch = useAppDispatch();
    const productActions = useAppSelector(state => state.productActions);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [generalError, setGeneralError] = useState<{ error: boolean; message: string }  | null>(null);
    const [productDeleteAction, setProductDeleteAction] = useState<boolean>(false);
    const navigateTo = useNavigate();
    const buyProductAction = async () => {
        dispatch(buyProduct(product));
        setProductDeleteAction(true);
    }
    useEffect(() => {
        if(productActions.buyProduct.success && productDeleteAction) {
            onClose();
            navigateTo('/products/my');
        }else if(productActions.buyProduct.error) {
            setGeneralError({error: true, message: productActions.buyProduct.error.message});
            setProductDeleteAction(false);
        }
    }, [productActions, productDeleteAction]);
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Buy This product?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Do you want to buy this product?
                        {generalError && generalError.error &&
                            <Box my={5} color={'red'}>{generalError.message}</Box>
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='purple' mr={3} onClick={buyProductAction}>
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
