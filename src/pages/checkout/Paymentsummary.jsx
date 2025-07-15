import React from 'react'
import { formatmoney } from '../../utils/money'
import axios from 'axios'
import { useNavigate } from 'react-router'

export default function Paymentsummary({paymentsummary,loadcart}) {
  const navigate = useNavigate();
  const createorder = async () =>
  {
     await  axios.post('/api/orders')
     await loadcart()
     navigate('/orders')
  }
  
  return (
    <>
          <div className="payment-summary">
                      <div className="payment-summary-title">
                        Payment Summary
                      </div>
          
                      {paymentsummary &&
                      (
                        <>
                        <div className="payment-summary-row">
                        <div>Items ({paymentsummary.totalItems}):</div>
                        <div className="payment-summary-money">{formatmoney(paymentsummary.productCostCents)}</div>
                      </div>
          
                      <div className="payment-summary-row">
                        <div>Shipping &amp; handling:</div>
                        <div className="payment-summary-money">{formatmoney(paymentsummary.shippingCostCents)}</div>
                      </div>
          
                      <div className="payment-summary-row subtotal-row">
                        <div>Total before tax:</div>
                        <div className="payment-summary-money">{formatmoney(paymentsummary.totalCostBeforeTaxCents)}</div>
                      </div>
          
                      <div className="payment-summary-row">
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">{formatmoney(paymentsummary.taxCents)}</div>
                      </div>
          
                      <div className="payment-summary-row total-row">
                        <div>Order total:</div>
                        <div className="payment-summary-money">{formatmoney(paymentsummary.totalCostCents)}</div>
                      </div>
          
                      <button className="place-order-button button-primary"onClick={createorder}>
                        Place your order
                      </button>
                        
                        </>
                      )}
                  </div>
    </>
  )
}
