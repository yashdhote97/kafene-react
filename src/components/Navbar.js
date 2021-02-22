import React from 'react';
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from '../images/logo.58169365.png'

const Navbar = () => {
    return ( 
        <div id="topbar">
        <div id="topbarLeft">
            <div id="brandWrap">
                <img src={logo} alt="Logo" />
                <p className="brandName">Kafene</p>
            </div>
                <nav>
                    <Link to="/orders" className="topbarMenu">Orders</Link>
                    <Link to="/products" className="topbarMenu">Products</Link>
                    <Link to="/users" className="topbarMenu">Users</Link>
                    <Link to="/" className="topbarMenu" id="logout">Logout</Link>
                </nav>
        </div>
    </div>
     );
}
 
export default Navbar;