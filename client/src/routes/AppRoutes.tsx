import {FC} from "react";
import {Routes, Route} from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import {Register} from "../pages/Register";
import {Logout} from "../pages/Logout";
import {useAppSelector} from "../store/hooks";
import RedirectToHome from "../components/RedirectToHome";

const AppRoutes: FC = () => {
    const auth = useAppSelector(state => state.auth);
    return (
        <Routes>

            {/* Routes that doesn't depend on user's authentication status */}
            <Route path="/" element={<Home />} />

            <Route path="/Logout" element={
                auth.isAuthenticated ? <Logout /> : <RedirectToHome />
            }></Route>



            {/* These routes can only be accessed by an unauthenticated user*/}
            <Route path="/register" element={
                auth.isAuthenticated ? <RedirectToHome /> : <Register />
            } />
            <Route path="/login" element={
                auth.isAuthenticated ? <RedirectToHome /> : <Login />
            } />

            <Route path="*" element={<RedirectToHome />} />

        </Routes>
    )
}

export default AppRoutes;
