import { Route, Switch } from "react-router-dom";

import Cart from "./Pages/Cart.js";
import Login from "./Pages/Login.js";
import Product from "./Pages/Product.js";
import React from "react";
import Transaction from "./Pages/Transactions.js";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Product} />
        <Route path="/login" component={Login} />
        <Route path="/Transactions" component={Transaction} />
        <Route path="/cart" component={Cart} />
      </Switch>
    );
  }
}
export default App;
