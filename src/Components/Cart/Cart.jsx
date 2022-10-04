import React from "react";
import "./Cart.css";
import leftArrow from "../../assets/leftArrow.png";
import rightArrow from "../../assets/rightArrow.png";
import { connect } from "react-redux";
import {
  decreaseCart,
  addToCart,
  getTotalCartQuantity,
  getTotalAmount,
} from "../../Redux/cartSlice";
import { Cartprice } from "../../Global_Functions/PriceFunction";

class Cart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
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
      console.log(`Loop`);
      if (attrId === myProductAttr[i].attrId) {
        console.log(`Attr Mathed`);
        if (myProductAttr[i].itemId === itemId) {
          console.log(`Item matched`);
          isActive = true;
        }
      }
    }
    return isActive;
  }

  render() {
    //Currency Logic
    let currencyChange = this.props.currencyChange;
    return (
      <>
        <h1 className="CartTitle">CART</h1>
        <hr />
        {this.props.cart.map((product) => {
          const myProductAttr = product.selectedAttr;
          return (
            <div className="CartMainContainer">
              <div className="CartContainer">
                <div className="CartContentContainer">
                  <div className="Title">{product.product.name}</div>
                  <div className="SubTitle">{product.product.brand}</div>
                  <div className="Price">
                    {Cartprice(currencyChange, product)}
                  </div>
                  {product.product.attributes &&
                    product.product.attributes.map((att) => {
                      let currentAttrId = att.id;
                      return (
                        <>
                          <div className="Size" key={att.id}>
                            {att.name}:
                          </div>
                          {att.type === "swatch" ? (
                            <div className="SizeBlocks">
                              {att.items.map((item) => {
                                return (
                                  <div
                                    className={`SizeBlock ${
                                      this.isAttrSelected(
                                        myProductAttr,
                                        currentAttrId,
                                        item.id
                                      )
                                        ? " ActiveColor"
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
                          ) : (
                            <div className="SizeBlocks">
                              {att.items.map((item) => {
                                return (
                                  <div
                                    className={`SizeBlock ${
                                      this.isAttrSelected(
                                        myProductAttr,
                                        currentAttrId,
                                        item.id
                                      )
                                        ? " ActiveSize"
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
                <div className="CountContent">
                  <div
                    className="PlusButton"
                    onClick={() => this.handleIncreaseCart(product)}
                  >
                    +
                  </div>
                  <div className="Count">{product.cartQuantity}</div>
                  <div
                    className="MinusButton"
                    onClick={() => this.handleDecreaseCart(product)}
                  >
                    -
                  </div>
                </div>
                <div className="CartImageContainer">
                  <div className="CartImage">
                    <img
                      src={product.product.gallery[this.state.imageIndex]}
                      alt="Loading..."
                      width="200px"
                      height="250px"
                    />
                    <div className="LeftRightContainer">
                      <img
                        src={leftArrow}
                        alt="shoes"
                        width="15px"
                        onClick={() => {
                          if (this.state.imageIndex !== 0) {
                            this.setState({
                              imageIndex: this.state.imageIndex - 1,
                            });
                          } else if (this.state.imageIndex === 0) {
                            this.setState({
                              imageIndex: product.product.gallery.length - 1,
                            });
                          }
                        }}
                      />
                      &nbsp;
                      <img
                        src={rightArrow}
                        alt="shoes"
                        width="15px"
                        onClick={() => {
                          if (
                            this.state.imageIndex <
                            product.product.gallery.length - 1
                          ) {
                            this.setState({
                              imageIndex: this.state.imageIndex + 1,
                            });
                          } else {
                            this.setState({ imageIndex: 0 });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
        <div className="BillContainer">
          <div className="Tax">Tax 21%: {currencyChange}42.00</div>
          <div className="Quantity">
            Quantity: {this.props.cartTotalQuantity}
          </div>
          <div className="Total">
            Total: {currencyChange}
            {this.props.cartTotalAmount}
          </div>
          <div className="CartButton">
            <div className="BtnText">ORDER</div>
          </div>
        </div>
      </>
    );
  }
}
function mapToStateProps(state) {
  return {
    cart: state.cart.cartItems,
    cartTotalQuantity: state.cart.cartTotalQuantity,
    cartTotalAmount: state.cart.cartTotalAmount,
    currencyChange: state.cart.currencyChange,
  };
}

export default connect(mapToStateProps, {
  decreaseCart,
  addToCart,
  getTotalCartQuantity,
  getTotalAmount,
})(Cart);
