import {FC} from "react";
import {Routes, Route} from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import {Register} from "../pages/Register";
import {Logout} from "../pages/Logout";
import {useAppSelector} from "../store/hooks";
import RedirectToHome from "../components/RedirectToHome";
import {MyProducts} from "../pages/Products/MyProducts";
import {Products} from "../pages/Products";
import {ViewProduct} from "../pages/Products/ViewProduct";
import {CreateProduct} from "../pages/Products/CreateProduct";
import {EditProduct} from "../pages/Products/EditProduct";

const AppRoutes: FC = () => {
    const auth = useAppSelector(state => state.auth);
    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/view/:id" element={<ViewProduct />} />

            <Route path="/products/my" element={!auth.isAuthenticated? <RedirectToHome/> : <MyProducts />} />
            <Route path="/products/create" element={!auth.isAuthenticated? <RedirectToHome/> : <CreateProduct />} />
            <Route path="/products/:id/edit/" element={!auth.isAuthenticated? <RedirectToHome /> : <EditProduct />} />
            <Route path="/logout" element={!auth.isAuthenticated? <RedirectToHome/> : <Logout />} />


            <Route path="/login" element={auth.isAuthenticated? <RedirectToHome/> : <Login />} />
            <Route path="/register" element={auth.isAuthenticated? <RedirectToHome/> : <Register />} />


            <Route path="*" element={<RedirectToHome />} />

        </Routes>
    )
}

export default AppRoutes;
