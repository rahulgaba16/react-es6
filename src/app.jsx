'use strict';
import React from 'react';
import store from './reduxStore';

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable allProducts={store.getState()} />
      </div>
    );
  }
}
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput() {
    store.dispatch({type:'SEARCH',searchText:this.refs.filteredText.value, stockCheck:this.refs.inStockCheck.checked});
  }
  render() {
    return (
      <div className='search-box'>
        <input type='text' ref='filteredText' value={this.props.filteredText} onChange={this.handleInput}/><br/>
        <div className='checkbox'>
          <input id='stock-check' type='checkbox' ref='inStockCheck' checked={this.props.inStockCheck} onChange={this.handleInput}/>
          <label htmlFor='stock-check'>Show products in stock</label>
        </div>
      </div>
    )
  }
}
class ProductRow extends React.Component {
  render() {
      const currentProd = this.props.product;
      const styleProp = !currentProd.stocked?{color:'red'}:{};
      return (
          <tr key={currentProd.name}>
            <td style={styleProp}>{currentProd.name}</td>
            <td>{currentProd.price}</td>
          </tr>
      );
  }
}

const CategoryRow = (props) => <tr className='product-heading' key={props.category}><th colSpan='2'>{props.category}</th></tr>;

class ProductTable extends React.Component {
  getTable() {
    let rows = [];
    let lastHeading = null;
    this.props.allProducts.map((product, i)=> {
      if(lastHeading!==product.category) {
        rows.push(<CategoryRow category={product.category} key = {product.category}/>);
      }
      if(!product.visible) {
        return;
      }
      rows.push(<ProductRow product={product} key = {product.name}/>);
      lastHeading = product.category;
    });
    return rows;
  }
  render() {
    return (
      <div>
        <table className='product-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.getTable()}
          </tbody>
        </table>
      </div>
    )
  }
}
module.exports = FilterableProductTable;
