import React from 'react'
import './Checkout.css'
import dayjs from 'dayjs'
import axios  from 'axios'
import { useEffect,useState } from 'react'
import Checkoutheader from './Checkoutheader'
import Ordersummary from './Ordersummary'
import Paymentsummary from './Paymentsummary'

function Checkout({cart,loadcart}) {
  
  const [deliveryoptions,setdeliveryoptions] = useState([])
  const [paymentsummary,setpaymentsummary] = useState(null)

  useEffect(()=>
  {
    const fetchcheckoutdata = async () =>
    {
        let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      
        setdeliveryoptions(response.data)
      

         response = await axios.get('/api/payment-summary')
            setpaymentsummary(response.data)
        
    }

    fetchcheckoutdata()
      

        

  },[cart])
  
  
  return (
     <>
     
           <title>Checkout</title>
         <Checkoutheader cart={cart}/>

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
          <Ordersummary cart={cart} deliveryoptions={deliveryoptions} loadcart={loadcart}/>
        <Paymentsummary paymentsummary={paymentsummary} loadcart={loadcart}/>
      </div>
    </div>
     </>
  )
}

export default Checkout