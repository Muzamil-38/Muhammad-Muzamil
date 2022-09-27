import React from "react";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import All from "./Components/All/All";
import Clothes from "./Components/Clothes/Clothes";
import Tech from "./Components/Tech/Tech";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";
import { productsQuery } from "../src/Queries";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: productsQuery }),
    })
      .then((res) => res.json())
      .then((data) => this.setState({ data: data.data.categories[0] }));
  }

  render() {
    return (
      <>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<All />} exact />
            <Route path="/clothes" element={<Clothes />} exact />
            <Route path="/tech" element={<Tech />} exact />
            <Route
              path="/:id"
              element={<ProductDetails data={this.state.data.products} />}
              exact
            />
            <Route path="/cart" element={<Cart />} exact />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
