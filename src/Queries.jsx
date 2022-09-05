export const productsQuery = `
query{
  categories{
    name,
    products{
      id,
      
      name,
      brand,
      description,
      inStock,
      category
      gallery,
      
      attributes{
        id,
        name,
        type,
        items{
          displayValue,
          value,
          id,
        }
      }
      prices{
        currency{
          symbol,
          label,
        }
        amount
      }
    }
  }
}
`;

export const currencyQuery = `query{
    currencies{
      label,
      symbol
    }
  }
  `;
