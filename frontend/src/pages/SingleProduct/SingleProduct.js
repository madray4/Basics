
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const SingleProduct = () => {
  const { PID } = useParams();
  const { products } = useSelector(state => state.product);
  const [ currentProduct, setCurrentProduct ] = useState(products.filter(product => PID === product._id)[0])
  const navigate = useNavigate();

  const fetchProduct = async (fetchURL) => {
    const response = await fetch(fetchURL);
    const json = await response.json();
    console.log(json);
    if(response.ok){
      setCurrentProduct(json);
    }
    else{
      navigate("/products/all");
    }
  }

  if(!currentProduct){
    const fetchURL = '/api/products/' + PID;
    fetchProduct(fetchURL);
  }

  return (
    <div>
      {currentProduct && <p>{currentProduct.name}</p> }
      <p>{PID}</p>
    </div>
  )
}

export default SingleProduct;