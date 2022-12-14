import React from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import "./Nav.css";
import Logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import MiniCart from "../MiniCart/MiniCart";
import { connect } from "react-redux";
import { currencyQuery } from "../../Queries";
import { getCurrency } from "../../Redux/cartSlice";

class Nav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currencyOpen: false,
      currencyChange: "$",
      miniCartOpen: false,
      clickArrowChange: <AiOutlineDown fontSize="0.6rem" />,
      data: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: currencyQuery }),
    })
      .then((res) => res.json())
      .then((data) => this.setState({ data: data.data.currencies }));
  }

  renderNavbarLinks = () => (
    <nav>
      <li>
        <NavLink
          className="navLink"
          style={({ isActive }) => ({
            color: isActive ? "green" : "black",
          })}
          to="/"
        >
          ALL
        </NavLink>
      </li>
      <li>
        <NavLink
          className="navLink"
          style={({ isActive }) => ({
            color: isActive ? "green" : "black",
          })}
          to="/clothes"
        >
          CLOTHES
        </NavLink>
      </li>
      <li>
        <NavLink
          className="navLink"
          style={({ isActive }) => ({
            color: isActive ? "green" : "black",
          })}
          to="/tech"
        >
          TECH
        </NavLink>
      </li>
    </nav>
  );

  renderNavbarCenter = () => (
    <div className="Center">
      <Link style={{ textDecoration: "none" }} to="/">
        <img src={Logo} alt="Logo" />
      </Link>
    </div>
  );

  renderNavbarRight = () => (
    <div className="Right">
      <span
        className="IconCurrency"
        onClick={() =>
          this.setState({ currencyOpen: !this.state.currencyOpen }) ||
          this.state.currencyOpen
            ? this.setState({
                clickArrowChange: <AiOutlineDown fontSize="0.6rem" />,
              })
            : this.setState({
                clickArrowChange: <AiOutlineUp fontSize="0.6rem" />,
              })
        }
      >
        {this.props.currencyChange} &nbsp;
        {this.state.clickArrowChange}
      </span>
      {this.state.currencyOpen && (
        <div
          className="Options"
          value={this.props.currencyChange}
          onClick={this.props.onCurrencyChange}
        >
          {this.state.data.map((cur) => (
            <option className="OptionItem" value={cur.symbol}>
              {cur.symbol} {cur.label}
            </option>
          ))}
        </div>
      )}
      <span
        className="IconCart"
        ref={this.miniCart}
        onClick={() => {
          this.setState({ miniCartOpen: !this.state.miniCartOpen });
        }}
      >
        <div className="CartCount">{this.props.cartTotalQuantity}</div>
        <FiShoppingCart />
        {this.state.miniCartOpen && <MiniCart />}
      </span>
    </div>
  );

  render() {
    if (this.state.miniCartOpen) {
      document.body.classList.add("active-miniCartOpen");
    } else {
      document.body.classList.remove("active-miniCartOpen");
    }
    return (
      <div className="Wrapper">
        {this.renderNavbarLinks()}
        {this.renderNavbarCenter()}
        {this.renderNavbarRight()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    cartTotalQuantity: state.cart.cartTotalQuantity,
    currencyChange: state.cart.currencyChange,
    cartQuantity: state.cart.cartItems.cartQuantity,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCurrencyChange: (event) => dispatch(getCurrency(event.target.value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
