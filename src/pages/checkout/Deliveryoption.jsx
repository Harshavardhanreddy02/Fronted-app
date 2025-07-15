import React from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import { formatmoney } from '../../utils/money'

function Deliveryoption({deliveryoptions,cartitem,loadcart}) {
  return (
    <>
    <div className="delivery-options">
          <div className="delivery-options-title">
     Choose a delivery option:
     </div>          
                               {deliveryoptions.map((deliveryoption)=>{
               
                                 let pricestring = ''
                                 if(deliveryoption.priceCents>0)
                                 {
                                   pricestring = `${formatmoney(deliveryoption.priceCents)}-Shipping`
                                 }
                                 const updatedeliveryoption = async () =>
                                 {
                                        await axios.put(`/api/cart-items/${cartitem.productId}`,{
                                          deliveryOptionId:deliveryoption.id
                                        }) 
                                        await loadcart()
                                 }
               
                                 return(
               
                                   <div key={deliveryoption.id} className="delivery-option" onClick={updatedeliveryoption}>
                                 <input type="radio" defaultChecked={deliveryoption.id === cartitem.productId}
                                   className="delivery-option-input"
                                   name={`delivery-option-${cartitem.productId}`} />
                                 <div>
                                   <div className="delivery-option-date">
                                     {dayjs(deliveryoption.estimatedDeliveryTimeMs).format('dddd,MMMM D')}
                                     
                                   </div>
                                   <div className="delivery-option-price">
                                     {pricestring}
                                   </div>
                                 </div>
                               </div>
                                 )
               
                               })}
                             
                             </div>
    
     </>
  )
}

export default Deliveryoption