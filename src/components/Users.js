import React, { Component } from 'react';
import axios from'axios';
import "../styles/Users.css";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { usersData:[], showData:[], value:"",display:false}
    }
    handleClick=()=>{
        this.setState({showData:[],display:false,value:""})
    }
    handleChange=(event)=> {
        this.setState({value: event.target.value});
    }
    handleKeyPress=(event)=>{
        if(event.key === 'Enter'){
            if(this.state.value.length<2){
                alert("Please enter atleast 2 characters");
                this.setState({showData:[],display:false});
            }
            else{
                let tempData=this.state.usersData.filter(user=>user.fullName.toLowerCase().includes(this.state.value.toLowerCase()));
                this.setState({showData:tempData,display:true});
            }
            console.log(this.state.value);
            event.preventDefault();
        }
    }
    componentDidMount() {      
        axios.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users").then(response => {
            this.setState({ usersData: response.data })
        })
    }
    render() { 
        let {usersData,showData,display}= this.state;
        let displayData
        if(display){
            displayData=[...showData];
        }
        else{
            displayData=[...usersData];
        }
        return ( 
            <div className="mainWrap">
            <div className="main">
                <h1>Users</h1>
                <div className="userList">
                    <form className="searchWrap">
                        <input id="search" type="search" placeholder="Search by Name" onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                        <input type="reset" id="reset" className="resetButton" value="Reset" onClick={this.handleClick}/>
                    </form>
                    <div className="userTableWrap">
                        <table className="userTable">
                            <tr>
                                <th>ID</th>
                                <th>User Avatar</th>
                                <th>Full Name</th>
                                <th>DoB</th>
                                <th>Gender</th>
                                <th>Current Location</th>
                            </tr>
                            <tbody id="tableData">
                                {   displayData.length ?
                                    displayData?.map((item) => (
                                    <tr>
                                    <td className="tdSecondry">{item.id}</td>
                                    <td className="tdPrimary"><img src={item.profilePic}/></td>
                                    <td className="tdSecondry">{item.fullName}</td>
                                    <td className="tdPrimary">{item.dob.replace("-", " ").replace("-", ", ")}</td>
                                    <td className="tdSecondry">{item.gender}</td>
                                    <td className="tdSecondry">{`${item.currentCity}, ${item.currentCountry}`}</td>
                                    </tr>
                                )):<></>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
         );
    }
}
 
export default Users;