import {FC, useEffect, useState} from "react";
import {DeleteIcon} from "@chakra-ui/icons";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text, useDisclosure
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {deleteProduct} from "../../../store/slices/ProductSlice/ProductActions";
import {removeSingleProductFromAllProducts} from "../../../store/slices/ProductSlice/AllProducts";
import {removeSingleProductFromUserProducts} from "../../../store/slices/ProductSlice/UserProducts";
import {removeSingleProductFromUserSoldProducts} from "../../../store/slices/ProductSlice/UserSoldProducts";
import {removeSingleProductFromUserLentProducts} from "../../../store/slices/ProductSlice/UserLentProducts";
import {useNavigate} from "react-router-dom";

const DeleteProduct: FC<{id: number, afterDelete: string}> = (product): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigateTo = useNavigate();

    const productActions = useAppSelector(state => state.productActions);
    const dispatch = useAppDispatch();

    const [deleteBtnHit, setDeleteBtnHit] = useState(false);
    const [generalError, setGeneralError] = useState<{error: boolean;message: string}>({error: false, message: ''});

    const deleteProductAction = async () => {
        dispatch(deleteProduct({id: product.id}));
        setDeleteBtnHit(true);
    }

    useEffect(() => {
        if(deleteBtnHit && productActions.deleteProduct.success){
            if(product.afterDelete==='removeProductFromRedux'){
                dispatch(removeSingleProductFromAllProducts(product.id));
                dispatch(removeSingleProductFromUserProducts(product.id));
                dispatch(removeSingleProductFromUserSoldProducts(product.id));
                dispatch(removeSingleProductFromUserLentProducts(product.id));
                onClose();
            }else{
                navigateTo('/products/my');
            }
        }else if(productActions.deleteProduct.error){
            setGeneralError({error: true, message: productActions.deleteProduct.error.message});
        }
    }, [deleteBtnHit, productActions]);

    return (
        <div>
            <DeleteIcon color={'red'} cursor={'pointer'} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Product?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {generalError.error &&
                            <Text color={'red'} my={3}>{generalError.message}</Text>
                        }
                        If you delete the product, the product will be removed from the database and you will never get this product back
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={2} onClick={deleteProductAction}>
                            Delete
                        </Button>
                        <Button colorScheme='blue' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default DeleteProduct;
