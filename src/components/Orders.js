import React, { Component } from 'react';
import axios from'axios';
import { Link } from "react-router-dom";
import '../styles/Orders.css';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = { orderData:[],filter:{"Delivered":1,"InTransit":1,"Packed":1,"New":1},count:0 }
    }
    handleInputChange=(event)=>{
        let target = event.target;
        let name=target.name;
        let itemCount=this.state.orderData.filter(item=>item.orderStatus==name).length;
        if(target.type=='checkbox' && target.checked){
            this.setState((prevState) => ({
                filter:{...prevState.filter,[name]:1},
                count:prevState.count+itemCount
              }));
        }
        else if(target.type=='checkbox' && !target.checked){
            this.setState((prevState) => ({
                filter:{...prevState.filter,[name]:0},
                count:prevState.count-itemCount
              }));
        }
    }
    componentDidMount() {      
        axios.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders").then(response => {
            this.setState({ orderData: response.data,count:response.data.length })
        })
    }
    render() { 
        let {orderData,count}=this.state;
        return ( 
            <div className="contentWrap">
            <div className="mainWrap">
                <h1 className="mainHeading">Orders</h1>
                <div className="main">
                    <div className="filterTab">
                        <h3>Filters</h3>
                        <div className="filterOptions">
                            <p id="count">{`Count:${count}`}</p>
                            <label className="filterLabel">
                                <input type="checkbox" name="New" id="orders-new" onChange={this.handleInputChange} defaultChecked />
                                New
                            </label>
                            <label className="filterLabel">
                                <input type="checkbox" name="Packed" id="orders-packed" onChange={this.handleInputChange} defaultChecked />
                                Packed
                            </label>
                            <label className="filterLabel">
                                <input type="checkbox" name="InTransit" id="orders-intransit" onChange={this.handleInputChange} defaultChecked />
                                InTransit
                            </label>
                            <label className="filterLabel">
                                <input type="checkbox" name="Delivered" id="orders-delivered" onChange={this.handleInputChange} defaultChecked />
                                Delivered
                            </label>
                        </div>
                    </div>
                    <div className="tableWrap">
                        <table className="tableContent">
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                            <tbody id="tableData">
                            {orderData.length &&
                            orderData?.map((item) => {
                                let orderPath=`/order/${item.id}`;
                                return(
                                    
                                <tr style={this.state.filter[item.orderStatus]?{display:"table-row"}:{display:"none"}}>

                                    <td className="tdSecondry"><Link to={orderPath} style={{textDecoration: 'none',color: '#8c8c8c'}}>{item.id}</Link></td>
                                    
                                    <td className="tdPrimary"><Link to={orderPath} style={{textDecoration: 'none',color: 'rgba(0,0,0,.8)'}}>{item.customerName}</Link></td>
                                    <td className="tdPrimary">{item.orderDate.replace("-", " ").replace("-", ", ")}<br/><span className="tdSecondry">{item.orderTime}</span></td>
                                    <td className="tdSecondry">{`$${item.amount}`}</td>
                                    <td className="tdSecondry">{item.orderStatus}</td>
                                </tr>
                            )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
         );
    }
}
 
export default Orders;