import React, {FC} from 'react';
import {AppRoutes} from './routes';
import {Provider} from "react-redux";
import store from "./store/index";
import Navbar from "./components/Navbar";
import {BrowserRouter} from "react-router-dom";
import CheckAuth from "./components/CheckAuth";

const App: FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <CheckAuth />
                <Navbar />
                <AppRoutes />
            </BrowserRouter>
        </Provider>
    )
}

export default App;
