import './Products.css'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { getProducts } from '../../store/slices/productSlice';
import Product from '../../components/Product/Product'

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);
  const { productType } = useParams();
  const initialFilter = productType;
  
  let filteredProducts = [...products];

  if(initialFilter !== "all"){
    filteredProducts = filteredProducts.filter(product => product.category === initialFilter);
  }
  if(filteredProducts.length > 0){
    filteredProducts = filteredProducts.sort((productA, productB) => {
      return (productA.price > productB.price) ? 1 : -1;
    })
  }

  const createProductURL = (id) => {
    return "/product/" + id;
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
          {filteredProducts.map(product => {
            return <Link to={createProductURL(product._id)}>
              <Product key={product._id} product={product}/>
              </Link>
            
          })}
        </div>
      }
    </div>
  )
}

export default Products;