import './Products.css'

import { useDispatch, useSelector } from 'react-redux';

const Products = () => {
  const { products } = useSelector(state => state.product);

  return (
    <div>
      <p>PRODUCTS</p>
      {/* {products && <p>{products[0].name}</p>} */}
      {products && products.map(product => {
        return <p>{product.name}</p>
      })}
    </div>
  )
}

export default Products;