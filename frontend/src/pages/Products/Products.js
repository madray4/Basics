import './Products.css'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProducts } from '../../store/slices/productSlice';
import Product from '../../components/Product/Product'

const Products = () => {
  const dispatch = useDispatch();
  let { products } = useSelector(state => state.product);
  const { productType } = useParams();
  const initialFilter = productType;
  if(initialFilter !== "all"){
    products = products.filter(product => product.category === initialFilter);
  }

  useEffect(() => {
    dispatch(getProducts());
  },[dispatch]);

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