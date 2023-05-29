import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// components

// pages
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <h3>123</h3>
      <div className="pages">
        <Routes>
          <Route
            path='/'
            element={<p>HOME</p>}>
          </Route>
          <Route
            path='/login'
            element={<Login/>}>
          </Route>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
