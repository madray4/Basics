import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';

// components
import Navbar from './components/Navbar/Navbar';

// pages
import Auth from './pages/Auth/Auth';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Order from './pages/Order/Order';
import Products from './pages/Products/Products';
import SingleProduct from './pages/SingleProduct/SingleProduct';

// functions
import { addItemToCart } from './store/slices/cartSlice';
import { getProducts } from './store/slices/productSlice';


function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getProducts());
  },[dispatch]);

  return (
    <div className="App" style={{backgroundColor: '#FAF9F8'}}>
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
            path='/product/:PID'
            element={<SingleProduct/>}
          />
          <Route
            path='/cart'
            element={<Cart/>}
          />
          <Route
            path='/checkout'
            element={<Checkout/>}
          />
          <Route
            path='/order/:id'
            element={<Order/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
