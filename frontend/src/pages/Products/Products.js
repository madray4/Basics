import './Products.css'

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/slices/productSlice';

import Product from '../../components/Product/Product'

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProducts());
  },[]);

  return (
    <div className="products-page">
      <div className="products-filter">
        <p>All</p>
        <p>T-Shirts</p>
      </div>
      {products && 
        <div className="products-wrapper">
          {products.map(product => {
            return <Product key={product._id} product={product}/>
          })}
        </div>
      }
      {/* {products && products.map(product => {
        return <Product key={product._id} product={product}/>
      })} */}
    </div>
  )
}

export default Products;