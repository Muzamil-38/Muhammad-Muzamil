import React from "react";
import "./All.css";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {productsQuery} from "../../Queries";

class All extends React.Component {
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
    let products = this.state.data.products;
    //Currency Logic
    let currencyChange = this.props.currencyChange;

    const price = (val) => {
      if (currencyChange === "$")
        return (
          <div className="Price">
            {val.prices[0].currency.symbol}
            {val.prices[0].amount}
          </div>
        );
      else if (currencyChange === "£")
        return (
          <div className="Price">
            {val.prices[1].currency.symbol}
            {val.prices[1].amount}
          </div>
        );
      else if (currencyChange === "A$")
        return (
          <div className="Price">
            {val.prices[2].currency.symbol}
            {val.prices[2].amount}
          </div>
        );
      else if (currencyChange === "¥")
        return (
          <div className="Price">
            {val.prices[3].currency.symbol}
            {val.prices[3].amount}
          </div>
        );
      else if (currencyChange === "₽")
        return (
          <div className="Price">
            {val.prices[4].currency.symbol}
            {val.prices[4].amount}
          </div>
        );
    };

    return (
      <div className="SectionContainer">
        <h1 className="SectionTitle">
          {this.state.data.name && this.state.data.name}
        </h1>

        <div className="ProductSection">
          {products &&
            products.map((val, index) => {
              return (
                <>
                  {val.inStock ? (
                    <div className="ProductContent" key={index}>
                      <div className="ProductBox">
                        <div className="ImageContainer">
                          <Link
                            style={{ textDecoration: "none", color: "black" }}
                            to={"/" + val.id}
                          >
                            <img
                              src={val.gallery[0]}
                              alt="img"
                              className="Img"
                            />
                          </Link>
                          <div className="CartIconContainer">
                            <Link to="/cart" className="CartBtn">
                              <FiShoppingCart color="white" />
                            </Link>
                          </div>
                        </div>
                        <h2 className="ProductTitle">{val.name}</h2>
                        {price(val)}
                      </div>
                    </div>
                  ) : (
                    <div className="ProductContent" key={val.id}>
                      <div>
                        <div>
                          <img src={val.gallery[0]} alt="img" className="Img" />
                          <div>
                            <FiShoppingCart color="white" />
                          </div>
                        </div>
                        <h2 className="ProductTitle">{val.name}</h2>
                        {price(val)}
                      </div>
                      <div className="StockStatus">Out of Stock</div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencyChange: state.cart.currencyChange,
  };
}

export default connect(mapStateToProps, null)(All);
