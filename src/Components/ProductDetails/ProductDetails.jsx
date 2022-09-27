import React from "react";
import "./ProductDetails.css";
import { connect } from "react-redux";
import { addToCart, getTotal, attrHandle } from "../../Redux/cartSlice";
import { useParams } from "react-router";

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
      data: [],
    };
  }
  state = {};

  handleAddToCart = (product) => {
    if (this.props.selectedAttr.length === 0) {
      alert("Kindly Select Attributes");
    } else {
      this.props.addToCart(product);
      this.props.getTotal();
    }
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
    const copyAttrSelected = this.props.selectedAttr;
    let newAttrSelected = [];
    let found = false;
    if (copyAttrSelected.length > 0) {
      copyAttrSelected.forEach(function (m) {
        for (const key in m) {
          if (currentAttrId === key) {
            const obj = { [key]: value };
            newAttrSelected.push(obj);
            found = true;
            //JO ADD KIA WO PEHLE SE THA
          } else {
            //JO ADD KIA WO NAHI MILA
            newAttrSelected.push(m);
          }
        }
      });
      if (!found) {
        const obj = { [currentAttrId]: value };
        newAttrSelected.push(obj);
      }
      this.setState({ selectedAttr: [...newAttrSelected] });
      this.props.attrHandle([...newAttrSelected]);
    } else {
      const obj = { [currentAttrId]: value };
      newAttrSelected.push(obj);
      this.setState({ selectedAttr: [...newAttrSelected] });
      this.props.attrHandle([...newAttrSelected]);
    }
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
    console.log(this.state.data);
    const id = this.props.id;
    const product = this.props.data.find((pro) => pro.id === id);
    const { name, gallery, brand, attributes, prices, description, inStock } =
      product;

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
            <div className="Price">{price()}</div>
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
  getTotal,
  attrHandle,
})(usingHooks(ProductDetails));
