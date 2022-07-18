import {FC, useEffect} from "react";
import {useAppDispatch} from "../store/hooks";
import {getAuth} from "../store/slices/AuthSlice";

const CheckAuth: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAuth());
    }, []);

    return (
        <></>
    )
}

export default CheckAuth;
