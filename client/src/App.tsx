import React, {FC} from 'react';
import {AppRoutes} from './routes';
import {Provider} from "react-redux";
import store from "./store/index";
import Navbar from "./components/Navbar";
import {BrowserRouter} from "react-router-dom";
import CheckAuth from "./components/CheckAuth";
import FetchAllProducts from "./components/FetchAllProducts";

const App: FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <CheckAuth />
                <FetchAllProducts />
                <Navbar />
                <AppRoutes />
            </BrowserRouter>
        </Provider>
    )
}

export default App;
