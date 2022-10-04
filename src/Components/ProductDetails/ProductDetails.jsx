import React from "react";
import "./ProductDetails.css";
import { connect } from "react-redux";
import { addToCart, getTotalCartQuantity,getTotalAmount } from "../../Redux/cartSlice";
import { useParams } from "react-router";
import { price } from "../../Global_Functions/PriceFunction";

function usingHooks(ProductDetails) {
  return function WrappedComponent(props) {
    const { id } = useParams();
    return <ProductDetails {...props} id={id} />;
  };
}

class ProductDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      selectedAttr: [],
    };
  }
  state = {};

  handleAddToCart = (product) => {
    if (this.state.selectedAttr.length === 0) {
      alert("Kindly Select Attributes");
    } else {
      this.props.addToCart({
        product: product,
        selectedAttr: this.state.selectedAttr,
        cartQuantity: 1,
      });
      this.props.getTotalCartQuantity();
    }
    this.props.getTotalAmount();
  };

  removeHTML = (str) => {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  };

  handleTab = (index) => {
    this.setState({ index: index });
  };

  attHandle = (value, currentAttrId) => {
    const copyAttrSelected = this.state.selectedAttr;
    let newAttrSelected = [];
    let found = false;
    //loop for check if length greater than 0
    if (copyAttrSelected.length > 0) {
      //check all attr ID if match

      for (let i = 0; i < copyAttrSelected.length; i++) {
        if (currentAttrId === copyAttrSelected[i].attrId) {
          const obj = { attrId: currentAttrId, itemId: value };
          newAttrSelected.push(obj);
          found = true;
          //JO ADD KIA WO PEHLE SE THA
        } else {
          //JO ADD KIA WO NAHI MILA
          newAttrSelected.push(copyAttrSelected[i]);
        }
      }

      if (!found) {
        const obj = { attrId: currentAttrId, itemId: value };
        newAttrSelected.push(obj);
      }
      this.setState({ selectedAttr: [...newAttrSelected] });
    } else {
      const obj = { attrId: currentAttrId, itemId: value };
      newAttrSelected.push(obj);
      this.setState({ selectedAttr: [...newAttrSelected] });
    }
  };

  isAttrSelected(attrId, itemId) {
    let isActive = false;
    if (this.state.selectedAttr.length > 0) {
      for (let i = 0; i < this.state.selectedAttr.length; i++) {
        if (attrId === this.state.selectedAttr[i].attrId) {
          if (this.state.selectedAttr[i].itemId === itemId) {
            isActive = true;
            return isActive;
          }
        }
      }
      return isActive;
    } else {
      return isActive;
    }
  }

  render() {
    const id = this.props.id;
    const product = this.props.data.find((pro) => pro.id === id);
    const { name, gallery, brand, attributes, description, inStock } = product;

    //Currency Logic
    let currencyChange = this.props.currencyChange;

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
                      height="100%"
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
              width="100%"
              height="100%"
            />
          </div>
          <div className="ProductDetailsContent">
            <div className="Title">{name}</div>
            <div className="SubTitle">{brand}</div>
            {attributes &&
              attributes.map((att) => {
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
                              className={`SizeBlock  ${
                                this.isAttrSelected(currentAttrId, item.id)
                                  ? " ActiveColor"
                                  : ""
                              } `}
                              key={item.id}
                              onClick={() =>
                                this.attHandle(item.id, currentAttrId)
                              }
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
                              }`}
                              key={item.id}
                              onClick={() =>
                                this.attHandle(item.id, currentAttrId)
                              }
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
            <div className="Price">{price(currencyChange, product)}</div>
            {inStock ? (
              <div
                onClick={() => this.handleAddToCart(product)}
                className="ContentButton"
              >
                <div className="BtnText">ADD TO CART</div>
              </div>
            ) : (
              <div className="DisabledContentButton">
                <div className="BtnText">ADD TO CART</div>
              </div>
            )}
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
    selectedAttr: state.cart.attrSelected,
  };
}
export default connect(mapStateToProps, {
  addToCart,
  getTotalCartQuantity,
  getTotalAmount
})(usingHooks(ProductDetails));
