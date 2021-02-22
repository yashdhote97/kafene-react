import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Products.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      showExpired: true,
      showLowStock:true,
      dateConversion: {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      },
    };
  }
  toTimestamp = (year, month, day) => {
    var dateToTime = new Date(Date.UTC(year, month - 1, day));
    return dateToTime.getTime();
  };

  handleInputChange = (event) => {
    let target = event.target;
    let name = target.name;
    let expiryCount=this.state.productData.filter(item=>new Date() >
    this.toTimestamp(
      item.expiryDate.split("-")[2],
      this.state.dateConversion[
        item.expiryDate.split("-")[1]
      ],
      item.expiryDate.split("-")[0]
    )).length;
    let lowCount=this.state.productData.filter(item=>item.stock<100).length;
    if (target.type == "checkbox" && target.checked) {
        if(name=="expired"){
            this.setState((prevState) => ({
                showExpired: true,
                count:prevState.count+expiryCount
              }));
        }
        else if(name=="low"){
            this.setState((prevState) => ({
                showLowStock: true,
                count:prevState.count+lowCount
              }));
        }
    } else if (target.type == "checkbox" && !target.checked) {
        if(name=="expired"){
            this.setState((prevState) => ({
                showExpired: false,
                count:prevState.count-expiryCount
            }));
        }
        else if(name=="low"){
            this.setState((prevState) => ({
                showLowStock: false,
                count:prevState.count-lowCount
            }));
        }
    }
  };
  componentDidMount() {
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
      .then((response) => {
        this.setState({
          productData: response.data,
          count: response.data.length,
        });
      });
  }
  render() {
    let { productData, count } = this.state;
    let showData
    if(!this.state.showLowStock){
        showData=productData.filter(item=>item.stock>100);
    }
    else{
        showData=[...productData];
    }
    return (
      <div className="contentWrap">
        <div className="mainWrap">
          <h1 className="mainHeading">Products</h1>
          <div className="main">
            <div className="filterTab">
              <h3>Filters</h3>
              <div className="filterOptions">
                <p id="count">{`Count:${count}`}</p>
                <label className="filterLabel">
                  <input
                    type="checkbox"
                    name="expired"
                    id="products-expired"
                    onChange={this.handleInputChange}
                    defaultChecked
                  />
                  Expired
                </label>
                <label className="filterLabel">
                  <input
                    type="checkbox"
                    name="low"
                    id="products-low"
                    onChange={this.handleInputChange}
                    defaultChecked
                  />
                  Low Stock
                </label>
              </div>
            </div>
            <div className="tableWrap">
              <table className="tableContent">
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Product Brand</th>
                  <th>Expiry Date </th>
                  <th>Unit Price</th>
                  <th>Stock</th>
                </tr>
                <tbody id="tableData">
                  {showData.length &&
                    showData?.map((item) => (
                      <tr
                        style={
                          !this.state.showExpired &&
                          +new Date() >
                            this.toTimestamp(
                              item.expiryDate.split("-")[2],
                              this.state.dateConversion[
                                item.expiryDate.split("-")[1]
                              ],
                              item.expiryDate.split("-")[0]
                            )
                            ? { display: "none" }
                            : { display: "table-row" }
                        }
                      >
                        <td className="tdSecondry"><Link to={`/product/${item.id}`} style={{textDecoration: 'none',color: '#8c8c8c'}}>{item.id}</Link></td>
                        <td className="tdPrimary"><Link to={`/product/${item.id}`} style={{textDecoration: 'none',color: 'rgba(0,0,0,.8)'}}>{item.medicineName}</Link></td>
                        <td className="tdSecondry">{item.medicineBrand}</td>
                        <td className="tdPrimary">{item.expiryDate}</td>
                        <td className="tdSecondry">{`$${item.unitPrice}`}</td>
                        <td className="tdSecondry">{item.stock}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
