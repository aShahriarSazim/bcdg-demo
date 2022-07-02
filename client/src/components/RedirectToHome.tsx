import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const RedirectToHome: FC = () => {
    const navigateTo = useNavigate();
    useEffect(() => {
        navigateTo("/");
    }, [navigateTo]);
    return (
        <></>
    );
}

export default RedirectToHome;
