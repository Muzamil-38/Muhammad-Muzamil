import React from "react";
import "./ProductDetails.css";
import { connect } from "react-redux";
import { addToCart, getTotal } from "../../Redux/cartSlice";
import { addAttributes, removeAttributes } from "../../Redux/attSlice";

import { useParams } from "react-router";

function usingHooks(ProductDetails) {
  return function WrappedComponent(props) {
    const { id } = useParams();
    return <ProductDetails {...props} id={id} />;
  };
}

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  handleAddToCart = (product) => {
    this.props.addToCart(product);
    this.props.getTotal();
  };

  removeHTML = (str) => {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  };

  handleTab = (index) => {
    this.setState({ index: index });
  };

  attHandle = (value) => {
    if (this.props.attSelected.includes(value)) {
      this.props.removeAttributes(value);
    } else {
      this.props.addAttributes(value);
    }
  };

  render() {
    const id = this.props.id;
    const product = this.props.data.find((pro) => pro.id === id);

    const { name, gallery, brand, attributes, prices, description } = product;

    //Currency Logic
    let currencyChange = this.props.currencyChange;

    function price() {
      if (currencyChange === "$")
        return (
          <div className="Price">
            {prices[0].currency.symbol}&nbsp;
            {prices[0].amount}
          </div>
        );
      else if (currencyChange === "£")
        return (
          <div className="Price">
            {prices[1].currency.symbol}&nbsp;
            {prices[1].amount}
          </div>
        );
      else if (currencyChange === "A$")
        return (
          <div className="Price">
            {prices[2].currency.symbol}&nbsp;
            {prices[2].amount}
          </div>
        );
      else if (currencyChange === "¥")
        return (
          <div className="Price">
            {prices[3].currency.symbol}&nbsp;
            {prices[3].amount}
          </div>
        );
      else if (currencyChange === "₽")
        return (
          <div className="Price">
            {prices[4].currency.symbol}&nbsp;
            {prices[4].amount}
          </div>
        );
    }
    return (
      <>
        <div className="ProductDetails">
          <div className="ProductDetailsImages">
            {gallery &&
              gallery.map((img, index) => {
                return (
                  <>
                    <img
                      src={img && img}
                      alt={img}
                      width="100%"
                      height="100px"
                      key={index}
                      onClick={() => this.handleTab(index)}
                    />
                  </>
                );
              })}
          </div>
          <div className="ProductDetailsImage">
            <img
              src={gallery && gallery[this.state.index]}
              alt={gallery}
              width="80%"
              height="80%"
            />
          </div>
          <div className="ProductDetailsContent">
            <div className="Title">{name}</div>
            <div className="SubTitle">{brand}</div>
            {attributes &&
              attributes.map((att) => {
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
            <div className="PriceTitle">PRICE:</div>
            <div className="Price">{price()}</div>
            <div className="ContentButton">
              <div
                className="BtnText"
                onClick={() => this.handleAddToCart(product)}
              >
                ADD TO CART
              </div>
            </div>
            <div className="DescContainer">
              <div className="DescText">{this.removeHTML(description)}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencyChange: state.cart.currencyChange,
    attSelected: state.attributes.attSelected,
  };
}
export default connect(mapStateToProps, {
  addToCart,
  getTotal,
  addAttributes,
  removeAttributes,
})(usingHooks(ProductDetails));
