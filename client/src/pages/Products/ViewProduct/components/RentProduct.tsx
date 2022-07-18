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
import axios from "../../../../axios";

const RentProduct: FC<ProductInterface> = (product: ProductInterface): JSX.Element => {
    const [disableRentButton, setDisableRentButton] = useState(true);
    const [existingRentIntervals, setExistingRentIntervals] = useState<{from: Date;to: Date}[] >([]);
    const [maxToDate, setMaxToDate] = useState<Date | null>(null);
    const [disableFromDateButton, setDisableFromDateButton] = useState(false);
    const [disableToDateButton, setDisableToDateButton] = useState(true);

    const [startSelectedDate, setStartSelectedDate] = useState<Date | null>(null);
    const [endSelectedDate, setEndSelectedDate] = useState<Date | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigateTo = useNavigate();
    const rentProduct = async () => {
        const rentedProduct = await axios.post(`/products/rent/${product.id}`, {from: startSelectedDate, to: endSelectedDate});
        onClose();
        navigateTo('/products/my');
    }
    const findEarliestRentIntervalGreaterThanDate = (date: Date) => {
        setMaxToDate(null);
        product.rentHistories.forEach(history => {
            if(date.getTime() < new Date(history.to).getTime()){
                if(maxToDate === null || (maxToDate.getTime() > new Date(history.from).getTime())){
                    const newMaxToDate = new Date(history.from);
                    newMaxToDate.setDate(newMaxToDate.getDate()-1);
                    setMaxToDate(newMaxToDate);
                }
            }
        });
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
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Rent This product?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
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
                        <Button disabled={disableRentButton} colorScheme='purple' mr={3} onClick={rentProduct}>
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
