import React, { Component } from 'react';
import axios from'axios';
import '../styles/OrderDisplay.css';


class OrderDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = { getOrder:{} }
    }
    componentDidMount(){
        const { orderid } = this.props.match.params;
        axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders/${orderid}`).then(response => {
            this.setState({ getOrder: response.data })
        })
    }
    render() { 
        let {getOrder}=this.state;
        return ( 
            <div>
                <table id="orderDetails">
                    <tbody id="ordersBody">
                        <tr>
                            <th>Id</th>:
                            <td>{getOrder.id}</td>
                        </tr>
                        <tr>
                            <th>Customer Name</th>:
                            <td>{getOrder.customerName}</td>
                        </tr>
                        <tr>
                            <th>Order Date</th>:
                            <td>{getOrder.orderDate}</td>
                        </tr>
                        <tr>
                            <th>Order Time</th>:
                            <td>{getOrder.orderTime}</td>
                        </tr>
                        <tr>
                            <th>Amount</th>:
                            <td>{`$${getOrder.amount}`}</td>
                        </tr>
                        <tr>
                            <th>Order Status</th>:
                            <td>{getOrder.orderStatus}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default OrderDisplay;
