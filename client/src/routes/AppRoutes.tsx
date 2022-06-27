import {FC} from "react";
import {Routes, Route} from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import RegisterName from "../pages/Register/Name/RegisterName";
import RegisterContacts from "../pages/Register/Contacts/RegisterContacts";
import RegisterPassword from "../pages/Register/Password/RegisterPassword";
import {Register} from "../pages/Register";

const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/name" element={<RegisterName />}></Route>
            <Route path="/register/contacts" element={<RegisterContacts />}></Route>
            <Route path="/register/password" element={<RegisterPassword />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
    )
}

export default AppRoutes;