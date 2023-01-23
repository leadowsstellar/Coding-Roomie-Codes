// Write some Code here

import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BooksManagerComponent from './BooksManagerComponent';
import ProductsManagerComponent from './ProductsManagerComponent';
import { Provider } from 'react-redux';
import { store } from "./redux-store/store"
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="books" element={<BooksManagerComponent />} />
              <Route path="products" element={<ProductsManagerComponent />} />
            </Route>
            <Route path="/" element={<Navigate to="login" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();