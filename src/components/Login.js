import React, { Component } from 'react';
import Orders from './Orders';
import axios from'axios';
import { Redirect } from "react-router-dom";
import "../styles/Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username:'',password:'',login:false}
    }
    handleChange=(event)=>{
        if(event.target.id=='username'){
            this.setState({username: event.target.value});
        }
        else if(event.target.id=='password'){
            this.setState({password: event.target.value});
        }
      }
    handleLogin=(e)=>{
        // let {loginStatus}=this.props;
        // alert(loginStatus);
        if(this.state.username=="" && this.state.password==""){
            alert("The required fields are empty")
        }
        else if(this.state.username!=this.state.password){
            alert("The required fields dont match each other")
        }
        else if(this.state.username==this.state.password){
            axios.post("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login",{
              username:this.state.username,
              password:this.state.password
            })
            .then((response)=>{
              this.setState({login:true});
            }).catch((err)=>{
              alert("Api call failed...still redirecting")
              this.setState({login:true});
              this.forceUpdate();
            })
        }
        e.preventDefault();
    }
    render() { 
      if (this.state.login) {
        return <Redirect to={'/orders'} />;
      }
        return ( 
            <div id="loginWrap">
            <div>
              <form class="formDiv">
                <h1>Sign In</h1>
                <input
                  id="username"
                  class="loginInput"
                  type="text"
                  value={this.state.username}
                  name="username"
                  onChange={this.handleChange}
                  placeholder="Enter Username"
                />
                <input
                  id="password"
                  class="loginInput"
                  type="password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Enter Password"
                />
                <input id="login" class="loginButton" type="submit" value="Login" onClick={this.handleLogin}/>
              </form>
            </div>
          </div>
         );
    }
}
// const mapDispatchToProps = (dispatch) => ({
//     dispatchProducts: (data) => dispatch(getProduct(data))
// })
  

  
 
export default Login;