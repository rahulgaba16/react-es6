'use strict';
import React from 'react';

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {filteredText:'',inStockCheck:false};
    this.handleUserInput = this.handleUserInput.bind(this);
  }
  handleUserInput({filteredText, inStockCheck}) {
    this.setState({filteredText, inStockCheck});
  }
  render() {
    return (
      <div>
        <SearchBar filteredText={this.state.filteredText} inStockCheck={this.state.inStockCheck} handleUserInput={this.handleUserInput}/>
        <ProductTable allProducts={PRODUCTS} inStockCheck={this.state.inStockCheck} filteredText={this.state.filteredText}/>
      </div>
    );
  }
}
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.searchChanged = this.searchChanged.bind(this);
  }
  searchChanged() {
    this.props.handleUserInput({filteredText:this.refs.filteredText.value,inStockCheck:this.refs.inStockCheck.checked});
  }
  render() {
    return (
      <div>
        <input type='text' ref='filteredText' value={this.props.filteredText} onChange={this.searchChanged}/><br/>
        <input type='checkbox' ref='inStockCheck' checked={this.props.inStockCheck} onChange={this.searchChanged}/>
        Show products in stock
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

const CategoryRow = (props) => <tr key={props.category}><th>{props.category}</th></tr>;

class ProductTable extends React.Component {
  getTable() {
    let rows = [];
    let lastHeading = null;
    this.props.allProducts.map((product, i)=> {
      if(lastHeading!==product.category) {
        rows.push(<CategoryRow category={product.category} key = {product.category}/>);
      }
      if((this.props.inStockCheck && !product.stocked) || product.name.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) === -1 ) {
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
        <table>
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
