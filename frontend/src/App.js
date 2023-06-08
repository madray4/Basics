import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// components
import Navbar from './components/Navbar/Navbar';

// pages
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
            path='/'
            element={<img src="https://basics-seeds.s3.amazonaws.com/surprised+pikachu+hd.jfif"></img>}>
          </Route>
          <Route
            path='/auth/:choice'
            element={<Auth/>}>
          </Route>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
