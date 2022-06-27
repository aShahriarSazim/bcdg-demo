import React, {FC, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Register: FC = (props: any) => {

    let navigateTo = useNavigate();
    useEffect(() => {
        navigateTo("/register/name");
    }, []);
    return (
        <></>
    )
}

export default Register;