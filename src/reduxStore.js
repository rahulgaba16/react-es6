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

const getFilteredResults = (state, text) => {
  return state.map((product, i) => {
    if (product.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
      return Object.assign({}, product, {
        visible: true
      });
    } else {
      return Object.assign({}, product, {
        visible: false
      });
    }
  });
};

const shoppingCart = (state = PRODUCTS, action) => {
  switch (action.type) {
    case 'SEARCH':
      return getFilteredResults(store.getState(), action.searchText);
    case 'TOGGLE_STOCKCHECK':
      if (action.stockCheck) {
        return state.map((obj) => {
          return Object.assign(obj, {
            visible: obj.stocked
          });
        });
      } else {
        state.forEach((obj) => {
          obj.visible = true;
        });
        return state;
      }
    default:
      state.forEach((obj) => {
        obj.visible = true;
      });
      return state;
  }
}
const store = createStore(shoppingCart);

module.exports = store;
