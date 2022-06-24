import {FC} from "react";
import {useAppSelector, useAppDispatch} from "../../store/hooks";

const Home: FC = () => {

    const data = useAppSelector(state => state.auth);
    console.log(data);

    return (
        <div className="home">
            <h1>Hello world</h1>
        </div>
    )
}

export default Home;