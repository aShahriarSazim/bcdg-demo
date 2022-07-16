import {FC, useEffect} from "react";
import {useAppDispatch} from "../../store/hooks";
import {clearAuth} from "../../store/slices/AuthSlice";
import {useNavigate} from "react-router-dom";

const Logout: FC = () => {
    const dispatch = useAppDispatch();
    const navigateTo = useNavigate();
    useEffect(() => {

        localStorage.removeItem("access_token");
        dispatch(clearAuth());

        navigateTo("/");
    }, []);
    return (
        <></>
    )
}

export default Logout;
