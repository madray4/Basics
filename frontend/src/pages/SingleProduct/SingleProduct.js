
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useState } from 'react';

const SingleProduct = () => {
  const { PID } = useParams();
  const { products } = useSelector(state => state.product);
  const currentProduct = products.filter(product => PID === product._id)[0];
  const navigate = useNavigate();

  if(products && !currentProduct){
    navigate("/products/all");
  }

  return (
    <div>
      {currentProduct && <p>{currentProduct.name}</p> }
      <p>{PID}</p>
    </div>
  )
}

export default SingleProduct;