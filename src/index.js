import React from 'react';
import ReactDOM  from 'react-dom';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Edit from './components/Edit';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path="edit" element={<Edit />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);