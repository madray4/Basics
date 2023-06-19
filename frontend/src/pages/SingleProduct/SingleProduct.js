import './SingleProduct.css'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const SingleProduct = () => {
  const navigate = useNavigate();
  const { PID } = useParams();

  const { products } = useSelector(state => state.product);
  const currentProduct = products.filter(product => PID === product._id)[0];
  const similarProducts = currentProduct ? products.filter(product => currentProduct.name === product.name) : "";
  const [selectedSize, setSelectedSize ] = useState(currentProduct ? currentProduct.sizes[0] : ""); 

  // redirects to all products if a use attempts to access a product that doesn't exist
  if(products && !currentProduct){
    navigate("/products/all");
  }

  // automatically selects a size if going directly to product page
  if(currentProduct && selectedSize === ""){
    setSelectedSize(currentProduct.sizes[0]);
  }
  // functions

  const addItemToCart = () => {
    console.log(currentProduct);
    console.log(selectedSize);
  };

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
              return <p key={size} className={selectedSize === size ? "current" : "not-current"}
                        onClick={() => setSelectedSize(size)}
                      >{size}</p>
            })}
          </div>
          <button className="add-to-cart-button" onClick={addItemToCart}>
            <span className="material-symbols-outlined">shopping_basket</span>
            Add to Cart
          </button>
          <p>{currentProduct.description}</p>
        </div>
      </div>
    }
    </div>
  )
}

export default SingleProduct;