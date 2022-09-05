import React, { useState } from "react";
import "./ProductDetails.css";
import { connect } from "react-redux";
import { addToCart, getTotal } from "../../Redux/cartSlice";
import { addAttributes, removeAttributes } from "../../Redux/attSlice";

import { useParams } from "react-router";

const ProductDetails = (props) => {
  const [index, setIndex] = useState(0);

  function handleAddToCart(product) {
    props.addToCart(product);
    props.getTotal();
  }

  function removeHTML(str) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  }

  function handleTab(index) {
    setIndex(index);
  }

  function attHandle(value) {
    if (props.attSelected.includes(value)) {
      props.removeAttributes(value);
    }else{
    props.addAttributes(value);}
  }

  const { id } = useParams();
  const product = props.data.find((pro) => pro.id === id);
  const { name, gallery, brand, attributes, prices, description } = product;

  //Currency Logic
  let currencyChange = props.currencyChange;

  const price = () => {
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
  };

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
                    onClick={() => handleTab(index)}
                  />
                </>
              );
            })}
        </div>
        <div className="ProductDetailsImage">
          <img
            src={gallery && gallery[index]}
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
                              props.attSelected.includes(item.value)
                                ? "ActiveColor"
                                : ""
                            } `}
                            key={item.id}
                            onClick={() => attHandle(item.value)}
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
                              props.attSelected.includes(item.value)
                                ? "ActiveSize"
                                : ""
                            } `}
                            key={item.id}
                            onClick={() => attHandle(item.value)}
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
            <div className="BtnText" onClick={() => handleAddToCart(product)}>
              ADD TO CART
            </div>
          </div>
          <div className="DescContainer">
            <div className="DescText">{removeHTML(description)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

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
})(ProductDetails);
