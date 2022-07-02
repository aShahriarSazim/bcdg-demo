import {FC, useEffect} from "react";
import {useAppDispatch} from "../store/hooks";
import axios from "../axios";
import {clearAuth, setAuth} from "../store/slices/AuthSlice";

const CheckAuth: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {

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

        const token = localStorage.getItem("access_token");

        // If token exists, check if the token is valid.
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
