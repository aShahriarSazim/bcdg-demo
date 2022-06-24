import {FC} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";

const AppRoutes: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />}></Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;