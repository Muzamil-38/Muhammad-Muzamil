import React from "react";
import "./MiniCart.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseCart,
  addToCart,
  getTotalCartQuantity,
  getTotalAmount,
} from "../../Redux/cartSlice";
import { Cartprice } from "../../Global_Functions/PriceFunction";

class MiniCart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeSize: "",
    };
  }

  componentDidMount() {
    this.props.getTotalAmount();
  }

  handleDecreaseCart = (cartItem) => {
    this.props.decreaseCart(cartItem);
    this.props.getTotalCartQuantity();
    this.props.getTotalAmount();
  };

  handleIncreaseCart = (cartItem) => {
    this.props.addToCart(cartItem);
    this.props.getTotalCartQuantity();
    this.props.getTotalAmount();
  };

  isAttrSelected(myProductAttr, attrId, itemId) {
    let isActive = false;
    for (let i = 0; i < myProductAttr.length; i++) {
      if (attrId === myProductAttr[i].attrId) {
        if (myProductAttr[i].itemId === itemId) {
          isActive = true;
        }
      }
    }
    return isActive;
  }

  render() {
    let currencyChange = this.props.currencyChange;
    return (
      <>
        <div className="overlay">
          <div
            className="MiniCartContainer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="MiniCartTitle">
              My Bag, {this.props.cartTotalQuantity} items
            </div>
            {this.props.cart.length < 1 ? (
              <div className="EmptyCart">Cart is Empty</div>
            ) : (
              this.props.cart.map((product) => {
                const myProductAttr = product.selectedAttr;
                return (
                  <div className="MiniCartContentContainer">
                    <div className="MiniCartContent">
                      <div className="MiniTitle">{product.product.name}</div>
                      <div className="MiniSubTitle">
                        {product.product.brand}
                      </div>
                      <div className="MiniPrice">
                        {Cartprice(currencyChange, product)}
                      </div>
                      {product.product.attributes &&
                        product.product.attributes.map((att) => {
                          const currentAttrId = att.id;
                          return (
                            <>
                              <div className="MiniSize" key={att.id}>
                                {att.name}:
                              </div>
                              {att.type === "swatch" ? (
                                <div className="MiniColorBlocks">
                                  {att.items.map((item, index) => {
                                    return (
                                      <div
                                        className={`MiniColorBlock ${
                                          this.isAttrSelected(
                                            myProductAttr,
                                            currentAttrId,
                                            item.id
                                          )
                                            ? " ActiveMiniColor"
                                            : ""
                                        } `}
                                        key={item.id}
                                        style={{
                                          background: item.value,
                                          color: item.value,
                                        }}
                                      >
                                        <small>{index}</small>
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
                                          this.isAttrSelected(
                                            myProductAttr,
                                            currentAttrId,
                                            item.id
                                          )
                                            ? " ActiveMiniSize"
                                            : ""
                                        } `}
                                        key={item.id}
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
                      <img
                        src={product.product.gallery[0]}
                        alt="Error"
                        width="100%"
                      />
                    </div>
                  </div>
                );
              })
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
  };
}

export default connect(AddToMiniCart, {
  decreaseCart,
  addToCart,
  getTotalCartQuantity,
  getTotalAmount,
})(MiniCart);
