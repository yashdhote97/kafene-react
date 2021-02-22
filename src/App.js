import Navbar from './components/Navbar';
import Login from './components/Login';
import Orders from './components/Orders';
import OrderDisplay from './components/OrderDisplay';
import ProductDisplay from './components/ProductDisplay';
import Users from './components/Users';
import Products from './components/Products';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
  <Router>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/orders" component={Orders} />
      <Route path="/products" component={Products} />
      <Route path="/users" component={Users} />
      <Route path="/order/:orderid" component={OrderDisplay} />
      <Route path="/product/:productid" component={ProductDisplay} />
      <Route component={Error}/>
    </Switch>
  </Router>
  );
}

export default App;
