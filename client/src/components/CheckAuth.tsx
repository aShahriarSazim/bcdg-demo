import {FC, useEffect} from "react";
import {useAppDispatch} from "../store/hooks";
import axios from "../axios";
import {clearAuth, setAuth} from "../store/slices/AuthSlice/AuthSlice";

const CheckAuth: FC = () => {
    const dispatch = useAppDispatch();

    const checkUserAuthentication = async () => {
        try {
            const response = await axios.get("/auth/current-loggedin-user");
            if(response.data){
                dispatch(setAuth(response.data));
            }else{
                localStorage.removeItem("access_token");
                dispatch(clearAuth());
            }
        }catch(e){
            localStorage.removeItem("access_token");
            dispatch(clearAuth());
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if(token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            checkUserAuthentication();
        }else {
            dispatch(clearAuth());
        }
    }, []);

    return (
        <></>
    )
}

export default CheckAuth;
