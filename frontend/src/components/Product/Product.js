import { useDispatch, useSelector } from 'react-redux';

const Product = (props) => {
  const { product } = props;
  const { name, price,imageURLs } = product;

  return(
    <div className="product">
      <img src={imageURLs[0]}></img>
      <p>{name}</p>
      <p>${price}</p>
    </div>
  )
}

export default Product;