import './Order.css'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const Order = () => {
  const { id } = useParams();
  let [ order , setOrder ] = useState({});
  const finalCost = (order.subtotal + 5.99 + order.tax)?.toFixed(2);
  const formatedTax = order.tax?.toFixed(2);
  
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(('/api/order/' + id ));
    const json = await response.json();
    if(response.ok){
      console.log(json);
      setOrder(json);
    };
    // redirect in else statement
    }
    fetchOrder();
  },[]);
  
  return (
    <div className="order-page">
      <h1 className="center">Order# {id}</h1>
      {order &&
        <div className="order-page-main">
          <div className="order-page-details">
            <div className="order-page-details-wrapper">
              <h3>Order Details</h3>
              <br/>
              <h4>Contact Information</h4>
              <div className="order-page-contact-details">
                <p>Email: { order.email }</p>
                <p>Name: { order.firstName }  { order.lastName }</p>
              </div>
              <h4>Address</h4>
              <p>{ order.address }</p>
              <p>{ order.city }  { order.state }  { order.zipCode }</p>
            </div>
          </div>
          <div className="order-page-sidebar">
            <div className="order-total-details">
              <div className="order-items">
              { order.items && order.items.map(item => {
                return <div className="order-item-wrapper">
                    <div className="order-item-image-wrapper">  
                      <p className="order-item-quantity">{ item.quantity }</p>
                      <img className="order-item-image" src={item.product.imageURLs[0]} alt ="LOADINGS..."/>
                    </div>
                    <div className="order-item-details">
                      <p>{item.product.name}</p>
                      <p>{item.product.color}</p>
                      <p>{item.size}</p>
                    </div>
                    <p className="order-item-price">${item.product.price}</p>
                  </div>
                })}
              </div>
              <div className="order-total-detail">
                <p>Order Value</p>
                <p>${ order.subtotal }</p>
              </div>
              <div className="order-total-detail">
                <p>Shipping</p>
                <p>${ order.shipping }</p>
              </div>
              <div className="order-total-detail">
                <p>Tax</p>
                <p>${ formatedTax }</p>
              </div>
              <br/>
              <hr/>
              <div className="order-total-detail">
                <p>Total</p>
                <p>${finalCost}</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
};

export default Order;