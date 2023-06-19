import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';

// components
import Navbar from './components/Navbar/Navbar';

// pages
import Auth from './pages/Auth/Auth';
import Cart from './pages/Cart/Cart';
import Products from './pages/Products/Products';
import SingleProduct from './pages/SingleProduct/SingleProduct';

// functions
import { getProducts } from './store/slices/productSlice';


function App() {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProducts());
    },[dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
            path='/'
            element={<p>HOME</p>}
          />
          <Route
            path='/auth/:choice'
            element={<Auth/>}
          />
          <Route
            path='/products/:productType'
            element={<Products/>}
          />
          <Route
            path='product/:PID'
            element={<SingleProduct/>}
          />
          <Route
            path='cart'
            element={<Cart/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
