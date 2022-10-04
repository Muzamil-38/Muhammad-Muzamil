import React from "react";
import "./Clothes.css";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { productsQuery } from "../../Queries";
import { connect } from "react-redux";
import { addToCart, getTotalCartQuantity } from "../../Redux/cartSlice";
import { price } from "../../Global_Functions/PriceFunction";

class Clothes extends React.PureComponent {
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
      .then((data) => this.setState({ data: data.data.categories[1] }));
  }

  //Add to Cart
  handleAddToCart = (product) => {
    console.log(product);
    const selectedAttrArray = [];
    for (let i = 0; i < product.attributes.length; i++) {
      selectedAttrArray.push({
        attrId: product.attributes[i].id,
        itemId: product.attributes[i].items[0].id,
      });
    }
    this.props.addToCart({
      product: product,
      selectedAttr: selectedAttrArray,
      cartQuantity: 1,
    });
    this.props.getTotalCartQuantity();
  };

  //Instock Products
  renderInstockProduct = (val) => {
    let currencyChange = this.props.currencyChange;

    return (
      <div className="ProductBox">
        <div className="ImageContainer">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/" + val.id}
          >
            <img src={val.gallery[0]} alt="img" className="Img" />
          </Link>
          <div
            className="CartIconContainer"
            onClick={() => this.handleAddToCart(val)}
          >
            <div className="CartBtn">
              <FiShoppingCart color="white" />
            </div>
          </div>
        </div>
        <h2 className="ProductTitle">{val.name}</h2>
        {price(currencyChange, val)}
      </div>
    );
  };

  //Out of Stock Products
  renderOutStockProduct = (val) => {
    let currencyChange = this.props.currencyChange;

    return (
      <div className="ProductContent" key={val.id}>
        <div>
          <div>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/" + val.id}
            >
              <img src={val.gallery[0]} alt="img" className="Img" />
            </Link>
            <div>
              <FiShoppingCart color="white" />
            </div>
          </div>
          <h2 className="ProductTitle">{val.name}</h2>
          {price(currencyChange, val)}
        </div>
        <div className="StockStatus">Out of Stock</div>
      </div>
    );
  };

  render() {
    let products = this.state.data.products;

    //Main Render
    return (
      <div className="SectionContainer">
        <h1 className="SectionTitle">
          {this.state.data.name && this.state.data.name}
        </h1>

        <div className="ProductSection">
          {products &&
            products.map((val) => {
              return (
                <>
                  {val.inStock
                    ? this.renderInstockProduct(val)
                    : this.renderOutStockProduct(val)}
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
    selectedAttr: state.cart.attrSelected,
  };
}

export default connect(mapStateToProps, { addToCart, getTotalCartQuantity })(
  Clothes
);
