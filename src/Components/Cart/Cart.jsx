import React, { Component } from "react";
import "./Cart.css";
import leftArrow from "../../assets/leftArrow.png";
import rightArrow from "../../assets/rightArrow.png";
import { connect } from "react-redux";
import { decreaseCart, addToCart, getTotal } from "../../Redux/cartSlice";
import { addAttributes, removeAttributes } from "../../Redux/attSlice";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSize: "",
      imageIndex: 0,
    };
  }

  componentDidMount() {
    this.props.getTotal(this.props.cart);
  }

  componentDidUpdate() {
    this.props.getTotal(this.props.cart);
  }

  handleDecreaseCart = (cartItem) => {
    this.props.decreaseCart(cartItem);
  };

  handleIncreaseCart = (cartItem) => {
    this.props.addToCart(cartItem);
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
        <h1 className="CartTitle">CART</h1>
        <hr />
        {this.props.cart.map((product) => (
          <div className="CartMainContainer">
            <div className="CartContainer">
              <div className="CartContentContainer">
                <div className="Title">{product.name}</div>
                <div className="SubTitle">{product.brand}</div>
                <div className="Price">{price(product)}</div>
                {product.attributes &&
            product.attributes.map((att) => {
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
                              this.props.attSelected.includes(item.value)
                                ? "ActiveColor"
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
                    <div className="SizeBlocks">
                      {att.items.map((item) => {
                        return (
                          <div
                            className={`SizeBlock ${
                              this.props.attSelected.includes(item.value)
                                ? "ActiveSize"
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
                    src={product.gallery[this.state.imageIndex]}
                    alt="Loading..."
                    width="100%"
                  />
                  <div className="LeftRightContainer">
                    <img
                      src={leftArrow}
                      alt="shoes"
                      width="15px"
                      onClick={() => {
                        if (this.state.imageIndex > 0) {
                          this.setState({
                            imageIndex: this.state.imageIndex - 1,
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
                          product.gallery.length - 1
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
        ))}
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
    attSelected: state.attributes.attSelected,
  };
}

export default connect(mapToStateProps, {
  decreaseCart,
  addToCart,
  getTotal,
  addAttributes,
  removeAttributes,
})(Cart);
