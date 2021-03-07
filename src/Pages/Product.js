import Navbar from '../Component/Navbar';
import React, { Fragment } from 'react';
import { base_url, product_image_url } from '../Config.js';
import axios from 'axios';

import './Pages.css';
import ProductList from '../Component/ProductList';

export default class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      token: '',
    };
    if (localStorage.getItem('token')) {
      this.state.token = localStorage.getItem('token');
    } else {
      window.location = '/login';
    }

    this.headerConfig.bind(this);
  }
  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  getProduct = () => {
    let url = base_url + '/product';
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            this.props.history.push('/login');
          }
        } else {
          console.log(error);
        }
      });
  };

  addToCart = (selectedItem) => {
    let tempCart = [];

    if (localStorage.getItem('cart') !== null) {
      tempCart = JSON.parse(localStorage.getItem('cart'));
    }
    let existItem = tempCart.find(
      (item) => item.product_id === selectedItem.product_id
    );

    if (existItem) {
      window.alert(`Anda telah memilih ${selectedItem.name}`);
    } else {
      let promptJumlah = window.prompt(
        `Masukkan jumlah ${selectedItem.name} yang beli`,
        ''
      );
      if (promptJumlah !== null && promptJumlah !== '') {
        selectedItem.qty = promptJumlah;
        tempCart.push(selectedItem);
        localStorage.setItem('cart', JSON.stringify(tempCart));
      }
    }
  };

  componentDidMount() {
    this.getProduct();
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="container">
          <h3 className="text-center textp">PRODUCT LIST</h3>
          <div className="row mt-4">
            {this.state.products.map((item) => (
              <ProductList
                key={item.product_id}
                name={item.name}
                price={item.price}
                stock={item.stock}
                image={product_image_url + '/' + item.image}
                onCart={() => this.addToCart(item)}
              />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}
