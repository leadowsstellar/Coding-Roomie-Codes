// Write some Code here

import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BooksManagerComponent from './BooksManagerComponent';
import ProductsManagerComponent from './ProductsManagerComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="/books" element={<BooksManagerComponent />} />
          <Route path="/products" element={<ProductsManagerComponent />} /></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

