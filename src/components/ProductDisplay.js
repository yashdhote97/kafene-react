import React, { Component } from 'react';
import axios from'axios';
import '../styles/OrderDisplay.css';


class ProductDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = { getProduct:{} }
    }
    componentDidMount(){
        const { productid } = this.props.match.params;
        axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products/${productid}`).then(response => {
            this.setState({ getProduct: response.data })
        })
    }
    render() { 
        let {getProduct}=this.state;
        return ( 
            <div>
                <table id="orderDetails">
                    <tbody id="ordersBody">
                        <tr>
                            <th>Id</th>:
                            <td>{getProduct.id}</td>
                        </tr>
                        <tr>
                            <th>Medicine Name</th>:
                            <td>{getProduct.medicineName}</td>
                        </tr>
                        <tr>
                            <th>Medicine Brand</th>:
                            <td>{getProduct.medicineBrand}</td>
                        </tr>
                        <tr>
                            <th>Expiry Date</th>:
                            <td>{getProduct.expiryDate}</td>
                        </tr>
                        <tr>
                            <th>Price Per Unit</th>:
                            <td>{`$${getProduct.unitPrice}`}</td>
                        </tr>
                        <tr>
                            <th>Prescription Required</th>:
                            <td>{getProduct.prescriptionRequired?"YES":"NO"}</td>
                        </tr>
                        <tr>
                            <th>Stock</th>:
                            <td>{getProduct.stock}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default ProductDisplay;