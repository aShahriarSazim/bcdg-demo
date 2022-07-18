import {FC, useEffect } from "react";
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
    Text, useDisclosure,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import axios from "../../../axios";
import {getProductById} from "../../../store/slices/ProductSlice/ProductById";

import BuyProduct from "./components/BuyProduct";
import RentProduct from "./components/RentProduct";

// @ts-ignore
const ViewProduct: FC = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
    const product = useAppSelector(state => state.product);

    const navigateTo = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const incrementProductView = async () => {
        await axios.post(`/products/increment/views/${id}`);
    }
    const dateFormat = (date: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        const curDate: Date = new Date(date);
        let month: string = months[parseInt(String(curDate.getMonth()))];
        let day: string = curDate.getDate() < 10 ? `0${curDate.getDate()}` : curDate.getDate().toString();
        let year: string = curDate.getFullYear().toString();

        return `${month} ${day}, ${year}`;
    }
    useEffect(() => {
        dispatch(getProductById({id: parseInt(String(id))}));
        if(product.error){
            navigateTo("/");
        }
        incrementProductView();
    }, []);
    if(product.loading){
        return (
            <Text>Loading...</Text>
        )
    }else if(product.data){
        const categories = product.data.categories.map(category => {
            return category.category.name;
        }).join(', ');
        const deleteProduct = async () => {
            await axios.delete(`/products/delete/${id}`);
            navigateTo('/products/my');
        }
        return (
            <Box my={10} mx={20}>
                {auth.isAuthenticated && product && auth.user.email === product.data.user.email &&
                    (

                    <Text textAlign={`right`}>
                        <Link to={`/products/${product.data.id}/edit`}>
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
                        <Text textAlign={`left`} fontWeight={`bold`} fontSize={40}>{product.data.title}</Text>
                        <Text textAlign={`left`} fontSize="15px" color="gray.500">Categories: {categories} </Text>
                        <Text textAlign={`left`} fontSize="15px" color="gray.500">Price: ${ product.data.price} | Rent: ${product.data.rent} ({product.data.rentPaymentPeriod})</Text>
                        <Box mt={10}>
                            {product.data.description}
                        </Box>
                        {product.data.rentHistories.length > 0 &&
                            <Box mt={'50px'}>
                                <Text fontWeight={'bold'} fontSize={'40px'} textAlign={'left'}>Rent Histories</Text>
                                <TableContainer >
                                    <Table variant='striped'>
                                        <Thead>
                                            <Tr>
                                                <Th>From</Th>
                                                <Th>To</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {product.data.rentHistories.map(rentHistory => {
                                                return (
                                                    <Tr key={rentHistory.id}>
                                                        <Td>{dateFormat(rentHistory.from)}</Td>
                                                        <Td>{dateFormat(rentHistory.to)}</Td>
                                                    </Tr>
                                                )
                                            })}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        }
                        {!auth.isAuthenticated &&
                            <Text textAlign={'right'} mt={10}>Please Login to buy or rent this product</Text>
                        }
                        {auth.isAuthenticated && product.data.user.id !== auth.user.id && !product.data.isSold &&
                            <Box mt={10}>
                                <BuyProduct {...product.data}></BuyProduct>
                                <RentProduct {...product.data}></RentProduct>
                            </Box>
                        }
                        {product.data.isSold &&
                            <Text color={'red'} textAlign={'right'} mt={10}>Product is already sold</Text>
                        }
                    </>
                }
            </Box>
        )
    }
}

export default ViewProduct;
