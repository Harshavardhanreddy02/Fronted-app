import React, { useState } from 'react'
import './header.css'

import { useNavigate,Link,useSearchParams } from 'react-router-dom';
function Header({cart}) {

  let totalquantity = 0;
  (cart || []).forEach((cartItem) => {
    totalquantity += cartItem.quantity;
  });
  const updatesearchbar = (event) =>
  {
    setsearch(event.target.value)
  }
const [searchParams] = useSearchParams();
const searchText = searchParams.get('search');
const [search, setsearch] = useState(searchText || '');
  const navigate = useNavigate()
  const searchproducts = () =>
  {
    navigate(`/?search=${search}`);
  }
  

  return (
    <>
        <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" value={search} onChange={updatesearchbar}/>

        <button className="search-button" onClick={searchproducts}>
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalquantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
    
    </>
  )
}

export default Header