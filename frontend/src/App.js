import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
  const { cartItems } = useSelector(state => state.cart);

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
            element={ user ? <Navigate to="/products/all"/> : <Auth/> }
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
            element={ cartItems ? <Checkout/> : <Navigate to="/products/all"/> }
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
