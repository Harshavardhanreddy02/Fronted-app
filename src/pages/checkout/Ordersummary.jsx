import React from 'react'
import dayjs from 'dayjs'
import { formatmoney } from '../../utils/money'
import Deliveryoption from './Deliveryoption'
import axios from 'axios'

function Ordersummary({cart,deliveryoptions,loadcart}) {
  return (
     <>
            <div className="order-summary">
                   {deliveryoptions.length>0 && cart.map((cartitem) => 
                   {
           
                     const selecteddeliveryoption = deliveryoptions.find((deliveryoption) =>
                     {
                            return deliveryoption.id === cartitem.deliveryOptionId
                     })

                     const deletecartitem = async () =>
                     {
                            await axios.delete(`/api/cart-items/${cartitem.productId}`)
                            await loadcart()
                     }
                     return(
                      
                     <div key={cartitem.productId}className="cart-item-container">
                       <div className="delivery-date">
                         Delivery date: {dayjs(selecteddeliveryoption.estimatedDeliveryTimeMs).format('dddd,MMMM D')}
                       </div>
           
                       <div className="cart-item-details-grid">
                         <img className="product-image" src={cartitem.product.image} alt={cartitem.product.name} />
                         <div className="cart-item-details">
                           <div className="product-name">
                             {cartitem.product.name}
                           </div>
                           <div className="product-price">
                             {formatmoney(cartitem.product.priceCents)}
                           </div>
                           <div className="product-quantity">
                             <span>
                               Quantity: <span className="quantity-label">{cartitem.quantity}</span>
                             </span>
                             <span className="update-quantity-link link-primary">
                               Update
                             </span>
                             <span className="delete-quantity-link link-primary" onClick={deletecartitem}>
                               Delete
                             </span>
                           </div>
                         </div>
           
                         <Deliveryoption deliveryoptions={deliveryoptions} cartitem={cartitem} loadcart={loadcart}/>
                       </div>
                     </div>
                      
                      
                   )})}
                   </div>
     </>
  )
}

export default Ordersummary