import {
  createStore
} from 'redux';

window.devToolsExtension ? window.devToolsExtension() : f => f;

const PRODUCTS = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football'
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball'
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball'
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch'
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5'
  },
  {
    category: 'Electronics',
    price: '$199.99',
    stocked: true,
    name: 'Nexus 7'
  }
];

const initialState = () => {
  PRODUCTS.forEach((obj) => {
    obj.visible = true;
  });
  return PRODUCTS;
}

const getFilteredResults = (state, action) => {
  let stockCheck = false;
  return state.map((product, i) => {
    stockCheck = (action.stockCheck ? product.stocked : true);
    return Object.assign({}, product, {
      visible: product.name.toLowerCase().indexOf(action.searchText.toLowerCase()) > -1 && stockCheck
    });
  });
};

const shoppingCart = (state = PRODUCTS, action) => {
  switch (action.type) {
    case 'SEARCH':
      return getFilteredResults(store.getState(), action);
    default:
      return initialState();
  }
}
const store = createStore(shoppingCart);

module.exports = store;
