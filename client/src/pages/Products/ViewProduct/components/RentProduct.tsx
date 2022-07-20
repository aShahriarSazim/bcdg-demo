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
    Text
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style/react-datepicker.css';
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {rentProduct} from "../../../../store/slices/ProductSlice/ProductActions";

const RentProduct: FC<ProductInterface> = (product: ProductInterface): JSX.Element => {
    const dispatch = useAppDispatch();
    const [disableRentButton, setDisableRentButton] = useState(true);
    const [existingRentIntervals, setExistingRentIntervals] = useState<{from: Date;to: Date}[] >([]);
    const [maxToDate, setMaxToDate] = useState<Date | null>(null);
    const [disableToDateButton, setDisableToDateButton] = useState(true);

    const [generalError, setGeneralError] = useState<{error: boolean;message: string}>({error: false, message: ''});
    const [rentProductActionHit, setRentProductActionHit] = useState<boolean>(false);
    const productActions = useAppSelector(state => state.productActions);

    const [startSelectedDate, setStartSelectedDate] = useState<Date | null>(null);
    const [endSelectedDate, setEndSelectedDate] = useState<Date | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigateTo = useNavigate();
    const rentProductAction = async () => {
        dispatch(rentProduct({
            id: product.id,
            from: startSelectedDate,
            to: endSelectedDate
        }));
        setRentProductActionHit(true);
    }
    const findEarliestRentIntervalGreaterThanDate = (date: Date) => {
        let newMaxToDate: Date | null = null;
        product.rentHistories.forEach(history => {
            if(date.getTime() < new Date(history.to).getTime()){
                if(newMaxToDate === null || (newMaxToDate.getTime() > new Date(history.from).getTime())){
                    newMaxToDate = new Date(history.from);
                }
            }
        });
        if(newMaxToDate){
            const finalMaxToDate = new Date(newMaxToDate);
            finalMaxToDate.setDate(finalMaxToDate.getDate() - 1);
            setMaxToDate(finalMaxToDate);
        }else{
            setMaxToDate(null);
        }
    }
    const checkDateAndSetStartDate = (date: Date) => {
        if(!date){
            setDisableToDateButton(true);
            setMaxToDate(null);
        }else if(!endSelectedDate || date.getTime() < endSelectedDate.getTime()){
            setStartSelectedDate(date);
            findEarliestRentIntervalGreaterThanDate(date);
            setDisableToDateButton(false);
        }else{
            setStartSelectedDate(date);
            findEarliestRentIntervalGreaterThanDate(date);
            setDisableToDateButton(false);
            setEndSelectedDate(null);
            setDisableRentButton(true);
        }
    }
    const checkDateAndSetEndDate = (date: Date) => {
        setEndSelectedDate(date);
        if(date){
            setDisableRentButton(false);
        }else{
            setDisableRentButton(true);
        }
    }
    useEffect(()=>{
        const existingIntervals = product.rentHistories.map(history => {
            return {from: history.from, to: history.to};
        });
        setExistingRentIntervals(existingIntervals);
        const rand = existingRentIntervals.map(interval => {
            return {start: new Date(interval.from), end: new Date(interval.to)};
        });
    }, []);
    useEffect(()=>{
        if(productActions.rentProduct.success && rentProductActionHit){
            onClose();
            navigateTo('/products/my');
        }else if(productActions.rentProduct.error){
            setRentProductActionHit(false);
            setGeneralError({error: true, message: productActions.rentProduct.error.message});
        }
    }, [rentProductActionHit, productActions]);
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Rent This product?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {generalError.error &&
                            <Text my={3} color={'red'}>{generalError.message}</Text>
                        }
                        <Text fontWeight={'bold'}>From</Text>
                        <Box className={'from-date'}>
                            <DatePicker
                                excludeDateIntervals={
                                    existingRentIntervals.map(interval => {
                                        return {start: new Date(interval.from), end: new Date(interval.to)};
                                    })
                                }
                                minDate={new Date()}
                                selected={startSelectedDate}
                                onChange={(date:Date) => checkDateAndSetStartDate(date)} />
                        </Box>
                        <Text mt={4} fontWeight={'bold'}>To</Text>
                        <Box className={'to-date'}>
                            <DatePicker maxDate={maxToDate === null ? undefined : maxToDate} minDate={startSelectedDate} disabled={disableToDateButton} selected={endSelectedDate} onChange={(date:Date) => checkDateAndSetEndDate(date)} />
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button disabled={disableRentButton} colorScheme='purple' mr={3} onClick={rentProductAction}>
                            Rent
                        </Button>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Box textAlign={'right'}>
                <Button onClick={onOpen} colorScheme="teal"  w={'150px'}  mt={4}>Rent Product</Button>
            </Box>
        </div>
    )
}

export default RentProduct;
