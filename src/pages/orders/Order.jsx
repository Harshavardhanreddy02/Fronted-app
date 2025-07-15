import React from 'react'
import Header from '../../components/Header'
import "./Order.css"
import {Link} from 'react-router'
import axios from 'axios'
import { useEffect,useState ,Fragment} from 'react'
import dayjs from 'dayjs'
import { formatmoney } from '../../utils/money'


function Order({cart,loadcart}) {

  const [orders,setorders] = useState([])

  useEffect(() =>
  {
    const fetchorderdata = async () =>
    {
      const response = await axios.get('/api/orders?expand=products')
      setorders(response.data)  
    }
    fetchorderdata()
      
  },[])
  return (
    <>
        <title>Orders</title>
        <Header cart={cart}/>

    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <div className="orders-grid">

        {orders.map((order) =>
        {

          const addtocart = async () =>
          {
              await axios.post('/api/cart-items',{
                productId : order.product.id,
                quantity :1
              })
              await loadcart()
          }
              return(

                <div key={order.id}className="order-container">

          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>{dayjs(order.orderTimeMs).format('MMMM, D')}</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>{formatmoney(order.totalCostCents)}</div>
              </div>
            </div>

            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>{order.id}</div>
            </div>
          </div>

          <div className="order-details-grid">
            {order.products.map((orderproduct) =>
            {
                  return(
                    <Fragment key={orderproduct.product.id}>
                     <div className="product-image-container">
              <img src={orderproduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderproduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderproduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderproduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message" onClick={addtocart}> Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${order.id}/${orderproduct.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
                    
                    </Fragment>
                  )
            })}
           
          </div>
        </div>
              )
        })}
       
      </div>
    </div>
    </>
  )
}

export default Order