import {FC} from "react";
import {useAppSelector, useAppDispatch} from "../../store/hooks";
import {setAuth} from "../../store/slices/AuthSlice";

const Register: FC = () => {
    let auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    function register(){
        let newAuth = {
            isAuthenticated: true,
            name: "John Doe",
            email: "john@example.com",
            token: "123456789"
        };
        dispatch(setAuth(newAuth));
        auth = newAuth;
        console.log(auth);
    }
    return (
        <div className="register">
            <h1>Register</h1>
            <button onClick={register}>setAuth</button>
        </div>
    )
}

export default Register;