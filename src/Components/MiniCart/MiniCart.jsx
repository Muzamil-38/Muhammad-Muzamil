import React, { Component } from "react";
import "./MiniCart.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { decreaseCart, addToCart, getTotal } from "../../Redux/cartSlice";
import { addAttributes, removeAttributes } from "../../Redux/attSlice";

class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSize: "",
    };
  }

  componentDidMount() {
    this.props.getTotal(this.props.cart);
  }

  handleDecreaseCart = (cartItem) => {
    this.props.decreaseCart(cartItem);
    this.props.getTotal(this.props.cart);
  };

  handleIncreaseCart = (cartItem) => {
    this.props.addToCart(cartItem);
    this.props.getTotal(this.props.cart);
  };

  attHandle = (value) => {
    if (this.props.attSelected.includes(value)) {
      this.props.removeAttributes(value);
    } else {
      this.props.addAttributes(value);
    }
  };

  render() {
    //Currency Logic
    let currencyChange = this.props.currencyChange;

    const price = (product) => {
      if (currencyChange === "$")
        return (
          <div className="Price">
            {product.prices[0].currency.symbol}&nbsp;
            {product.prices[0].amount}
          </div>
        );
      else if (currencyChange === "£")
        return (
          <div className="Price">
            {product.prices[1].currency.symbol}&nbsp;
            {product.prices[1].amount}
          </div>
        );
      else if (currencyChange === "A$")
        return (
          <div className="Price">
            {product.prices[2].currency.symbol}&nbsp;
            {product.prices[2].amount}
          </div>
        );
      else if (currencyChange === "¥")
        return (
          <div className="Price">
            {product.prices[3].currency.symbol}&nbsp;
            {product.prices[3].amount}
          </div>
        );
      else if (currencyChange === "₽")
        return (
          <div className="Price">
            {product.prices[4].currency.symbol}&nbsp;
            {product.prices[4].amount}
          </div>
        );
    };

    return (
      <>
        <div className="MiniCartContainer">
          <div className="MiniCartTitle">
            My Bag, {this.props.cartTotalQuantity} items
          </div>
          {this.props.cart.length < 1 ? (
            <div className="EmptyCart">Cart is Empty</div>
          ) : (
            this.props.cart.map((product) => (
              <div className="MiniCartContentContainer">
                <div className="MiniCartContent">
                  <div className="MiniTitle">{product.name}</div>
                  <div className="MiniSubTitle">{product.brand}</div>
                  <div className="MiniPrice">{price(product)}</div>
                  {product.attributes &&
                    product.attributes.map((att) => {
                      return (
                        <>
                          <div className="MiniSize" key={att.id}>
                            {att.name}:
                          </div>
                          {att.type === "swatch" ? (
                            <div className="MiniSizeBlocks">
                              {att.items.map((item) => {
                                return (
                                  <div
                                    className={`MiniSizeBlock ${
                                      this.props.attSelected.includes(
                                        item.value
                                      )
                                        ? "ActiveMiniColor"
                                        : ""
                                    } `}
                                    key={item.id}
                                    onClick={() => this.attHandle(item.value)}
                                    style={{
                                      background: item.value,
                                      color: item.value,
                                    }}
                                  >
                                    <small>{item.value}</small>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="MiniSizeBlocks">
                              {att.items.map((item) => {
                                return (
                                  <div
                                    className={`MiniSizeBlock ${
                                      this.props.attSelected.includes(
                                        item.value
                                      )
                                        ? "ActiveMiniSize"
                                        : ""
                                    } `}
                                    key={item.id}
                                    onClick={() => this.attHandle(item.value)}
                                    style={{
                                      background: item.value,
                                      color: item.value,
                                    }}
                                  >
                                    <small>{item.value}</small>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </>
                      );
                    })}
                </div>
                <div className="MiniCountContent">
                  <div
                    className="MiniPlusButton"
                    onClick={() => this.handleIncreaseCart(product)}
                  >
                    +
                  </div>
                  <div className="MiniCount">{product.cartQuantity}</div>
                  <div
                    className="MiniMinusButton"
                    onClick={() => this.handleDecreaseCart(product)}
                  >
                    -
                  </div>
                </div>
                <div className="MiniCartImageContainer">
                  <img src={product.gallery} alt="Error" width="100%" />
                </div>
              </div>
            ))
          )}

          <div className="TotalContent">
            <div className="TotalText">Total</div>
            <div className="TotalInt">
              {currencyChange} {this.props.cartTotalAmount}
            </div>
          </div>
          <div className="BtnContainer">
            <Link to="/cart" className="BagBtn">
              VIEW BAG
            </Link>
            <div className="CheckBtn">CHECK OUT</div>
          </div>
        </div>
      </>
    );
  }
}

function AddToMiniCart(state) {
  return {
    cart: state.cart.cartItems,
    cartTotalQuantity: state.cart.cartTotalQuantity,
    cartTotalAmount: state.cart.cartTotalAmount,
    currencyChange: state.cart.currencyChange,
    attSelected: state.attributes.attSelected,
  };
}

export default connect(AddToMiniCart, {
  decreaseCart,
  addToCart,
  getTotal,
  addAttributes,
  removeAttributes,
})(MiniCart);
