import { Routes, Route } from 'react-router';
import {Homepage} from './pages/home/Homepage';
import Checkout from './pages/checkout/Checkout';
import Order from './pages/orders/Order'
import Tracking from './pages/Tracking'
import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';

function App() {
  const [cart,setcart] = useState([])

   const loadcart = async () =>
    {
          const response = await axios('/api/cart-items?expand=product')
        
          setcart(response.data)
        
    }
  
  useEffect(()=>
  {
   
    loadcart()
  },[])
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage cart={cart} loadcart={loadcart}/>} />
        <Route path='checkout' element={<Checkout  cart={cart} loadcart={loadcart}/>} />
        <Route path='orders' element={<Order cat={cart} loadcart={loadcart}/>}/>
        <Route path='tracking/:orderId/:productId' element={<Tracking cart={cart}/>}/>
      </Routes>
    </>
  );
}

export default App;
