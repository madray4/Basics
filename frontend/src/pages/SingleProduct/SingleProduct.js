
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const { PID } = useParams();

  return (
    <div>
      <p>{PID}</p>
    </div>
  )
}

export default SingleProduct;