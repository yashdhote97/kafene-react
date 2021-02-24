import React from 'react';
import { Link,Redirect } from "react-router-dom";
import "../styles/Navbar.css";
import {useSelector, useDispatch} from "react-redux";
import {setLogin} from "../reducers";
import logo from '../images/logo.58169365.png'

const Navbar = () => {
    let login=useSelector(state => state.loginStatus);
    console.log(login)
    const dispatch = useDispatch();
    return ( 
        <div id="topbar">
        <div id="topbarLeft">
            <div id="brandWrap">
                <img src={logo} alt="Logo" />
                <p className="brandName">Kafene</p>
            </div>
            {login?(
                <nav>
                    <Link to="/orders" className="topbarMenu">Orders</Link>
                    <Link to="/products" className="topbarMenu">Products</Link>
                    <Link to="/users" className="topbarMenu">Users</Link>
                    <Link to="/" className="topbarMenu" id="logout" onClick={() => dispatch(setLogin(false))}>Logout</Link>
                </nav>
            ):(
                <nav>
                    <Link to="/" className="topbarMenu">Orders</Link>
                    <Link to="/" className="topbarMenu">Products</Link>
                    <Link to="/" className="topbarMenu">Users</Link>
                    <Redirect to={'/'} />
                </nav>
                
            )}
        </div>
    </div>
     );
}
 
export default Navbar;
