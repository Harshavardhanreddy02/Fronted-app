import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import Header from '../../components/Header.jsx'
import './Homepage.css' 
import { useSearchParams } from 'react-router';

import Productgrid from './Productgrid.jsx'


export function Homepage({cart,loadcart}) {
     const [products,setproducts] = useState([])
      const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
     

  useEffect(()=>
  {
    const gethomedata = async () =>
    {
            const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(urlPath);
        setproducts(response.data)
    
    }
    gethomedata()
     
  },[search])
  
  return (
    <>
    <title>Ecommerce website</title>

    <Header cart={cart}/>
          

    <div className="home-page">
    <Productgrid  products={products} loadcart={loadcart}/>
    </div>
    </>
  )
}

