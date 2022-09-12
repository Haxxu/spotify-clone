import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from '~/App';
import store from '~/redux/store';
import './globalStyles.scss';

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <App />
                    <ToastContainer
                        position='bottom-center'
                        autoClose={2000}
                        hideProgressBar={true}
                        closeButton={true}
                        theme='colored'
                        icon={false}
                    />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);
