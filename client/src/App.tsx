import React, {FC} from 'react';
import {AppRoutes} from './routes';
import {Provider} from "react-redux";
import store from "./store/index";

const App: FC = () => {
    return (
        <Provider store={store}>
            <div className="app">
                <AppRoutes />
            </div>
        </Provider>
    )
}

export default App;
