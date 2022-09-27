import React from "react";
import "./Cart.css";
import leftArrow from "../../assets/leftArrow.png";
import rightArrow from "../../assets/rightArrow.png";
import { connect } from "react-redux";
import { decreaseCart, addToCart, getTotal } from "../../Redux/cartSlice";

class Cart extends React.PureComponent {
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

  isAttrSelected(attrId, itemId) {
    let isActive = false;
    console.log(`Class Active Wala ${JSON.stringify(this.state.selectedAttr)}`);
    if (this.props.selectedAttr.length > 0) {
      this.props.selectedAttr.forEach(function (m) {
        for (const key in m) {
          if (attrId === key) {
            console.log(`Attributes matched ${attrId}`);
            if (m[key] === itemId) {
              console.log(`Item matched ${m[key]}`);
              isActive = true;
              return isActive;
            }
          }
        }
      });
      return isActive;
    } else {
      return isActive;
    }
  }

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
                    const currentAttrId = att.id;
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
                                    this.isAttrSelected(currentAttrId, item.id)
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
                                    this.isAttrSelected(currentAttrId, item.id)
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
                    src={product.gallery[this.state.imageIndex]}
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
                            imageIndex: product.gallery.length - 1,
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
    selectedAttr: state.cart.attrSelected,
  };
}

export default connect(mapToStateProps, {
  decreaseCart,
  addToCart,
  getTotal,
})(Cart);
