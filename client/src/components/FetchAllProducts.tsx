import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import axios from "../axios";
import {setAllProducts} from "../store/slices/ProductSlice";

const FetchAllProducts: FC = () => {

    const dispatch = useAppDispatch();
    const getAllProducts = async () => {
        const response = await axios.get("/products");
        dispatch(setAllProducts(response.data));
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <></>
    )
}

export default FetchAllProducts;
