import {FC} from "react";
import {useAppSelector, useAppDispatch} from "../../store/hooks";

const Home: FC = () => {

    const auth = useAppSelector(state => state.auth);
    const registerData = useAppSelector(state => state.registerData);
    console.log(auth, registerData);

    return (
        <div className="home">
            <h1>Hello world</h1>
        </div>
    )
}

export default Home;