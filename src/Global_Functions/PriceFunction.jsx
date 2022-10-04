export const price = (currencyChange,product) => {
    //Currency Logic
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


  export const Cartprice = (currencyChange,product) => {
    //Currency Logic
    if (currencyChange === "$")
      return (
        <div className="Price">
          {product.product.prices[0].currency.symbol}&nbsp;
          {product.product.prices[0].amount}
        </div>
      );
    else if (currencyChange === "£")
      return (
        <div className="Price">
          {product.product.prices[1].currency.symbol}&nbsp;
          {product.product.prices[1].amount}
        </div>
      );
    else if (currencyChange === "A$")
      return (
        <div className="Price">
          {product.product.prices[2].currency.symbol}&nbsp;
          {product.product.prices[2].amount}
        </div>
      );
    else if (currencyChange === "¥")
      return (
        <div className="Price">
          {product.product.prices[3].currency.symbol}&nbsp;
          {product.product.prices[3].amount}
        </div>
      );
    else if (currencyChange === "₽")
      return (
        <div className="Price">
          {product.product.prices[4].currency.symbol}&nbsp;
          {product.product.prices[4].amount}
        </div>
      );
  };