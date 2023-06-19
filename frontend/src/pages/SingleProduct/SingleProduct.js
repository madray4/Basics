import './SingleProduct.css'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const SingleProduct = () => {
  const { PID } = useParams();
  const { products } = useSelector(state => state.product);
  const [selectedSize, setSelectedSize ] = useState(""); 

  const currentProduct = products.filter(product => PID === product._id)[0];
  const similarProducts = products.filter(product => currentProduct.name === product.name);
  const navigate = useNavigate();

  if(products && !currentProduct){
    navigate("/products/all");
  }

  return (
    <div className="single-product-page">
    {currentProduct &&
      <div className="single-product-wrapper">
        <img className="single-product-preview" src={currentProduct.imageURLs[0]}/>
        <div className="single-product-description-wrapper">
          <h1>{currentProduct.name}</h1>
          <p>${currentProduct.price}</p>
          <div className="single-product-color-wrapper">
            <p>{currentProduct.color}</p>
            <div className="single-product-color-images">
              {similarProducts.map(product => {
                return <Link key={product._id} to={"/product/" + product._id}>
                        <img className={product.color === currentProduct.color ? "current" : "not-current"} 
                          src={product.imageURLs[0]}/>
                      </Link>
              })}
            </div>
          </div>
          <div className="single-product-size-wrapper">
            {currentProduct.sizes.map(size => {
              return <p className={selectedSize === size ? "current" : "not-current"}
                        onClick={() => setSelectedSize(size)}
                      >{size}</p>
            })}
          </div>
          <p>{currentProduct.description}</p>
        </div>
      </div>
    }
    </div>
  )
}

export default SingleProduct;