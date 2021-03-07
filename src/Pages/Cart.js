import Navbar from '../Component/Navbar';
import React, { Fragment } from 'react';
import CartList from '../Component/CartList';
import CartList2 from '../Component/CartList2';
import { base_url, product_image_url } from '../Config.js';
import axios from 'axios';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      customerID: '',
      customerName: '',
      cart: [],
      total: 0,
      status: false,
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

  minus = async (index) => {
    let temp = this.state.cart;
    temp[index].qty = temp[index].qty * 1 - 1;
    this.setState({
      cart: temp,
    });
    if (temp[index].qty <= 0) {
      this.deleteCart(index);
    }

    let tempCart = await this.state.cart;
    localStorage.setItem('cart', JSON.stringify(tempCart));

    this.initCart();
  };

  plus = async (index) => {
    let temp = this.state.cart;
    temp[index].qty = temp[index].qty * 1 + 1;
    this.setState({
      cart: temp,
    });

    let tempCart = await this.state.cart;
    localStorage.setItem('cart', JSON.stringify(tempCart));

    this.initCart();
  };

  deleteCart = async (index) => {
    if (window.confirm(`Apakah anda yakin menghapus dari cart?`)) {
      let temp = this.state.cart;

      temp.splice(index, 1);
      this.setState({ cart: temp });

      let tempCart = await this.state.cart;
      localStorage.setItem('cart', JSON.stringify(tempCart));

      this.initCart();
    }
  };
  checkOut = () => {
    let tempCart = [];
    if (localStorage.getItem('cart') !== null) {
      tempCart = JSON.parse(localStorage.getItem('cart'));
    }

    let data = {
      customer_id: this.state.customerID,
      detail_transaksi: tempCart,
    };

    let url = base_url + '/transaksi';

    axios
      .post(url, data, this.headerConfig())
      .then((response) => {
        // clear cart
        window.alert(response.data.message);
        localStorage.removeItem('cart');
        window.location = '/transactions';
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

  initCart = async () => {
    let tempCart = [];
    if (localStorage.getItem('cart') !== null) {
      tempCart = JSON.parse(localStorage.getItem('cart'));
    }
    if (localStorage.getItem('customer') !== null) {
      let customer = JSON.parse(localStorage.getItem('customer'));
      this.setState({
        customerID: customer.customer_id,
        customerName: customer.name,
      });
    }

    let totalharga = 0;
    tempCart.map((item) => {
      totalharga += item.price * item.qty;
    });

    this.setState({
      cart: tempCart,
      total: totalharga,
    });
  };

  componentDidMount() {
    this.initCart();
  }

  render() {
    if (this.state.total) {
      return (
        <Fragment>
          <Navbar />
          <div className="container">
            <h3 className="text-center textp">CART LIST</h3>
            <div className=" contp">
              <div className="left">
                {this.state.cart.map((item, index) => (
                  <CartList
                    key={index}
                    image={product_image_url + '/' + item.image}
                    nama={item.name}
                    price={item.price}
                    qty={item.qty}
                    subTotal={item.price * item.qty}
                    minus={() => this.minus(index)}
                    plus={() => this.plus(index)}
                    drop={() => this.deleteCart(index)}
                  />
                ))}
              </div>
              <div className="right">
                <div className="boxPembayaran">
                  <div className="right1">
                    <div className="pembayaran">
                      <p>PEMBAYARAN</p>
                    </div>
                    {this.state.cart.map((item, index) => (
                      <CartList2
                        key={index}
                        nama={item.name}
                        subtotal={item.price * item.qty}
                      />
                    ))}

                    <div className="total">
                      <p className="font-weight-bold">Total</p>
                      <p>{this.state.total}</p>
                    </div>
                    <button
                      className="checkout"
                      onClick={() => this.checkOut()}
                    >
                      CHECKOUT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Navbar />
          <div className="container align-items-center">
            <div className="conp">
              <i className="fas fa-cart-plus fa-10x w-100"></i>
              <h2 className="text-center font-weight-normal mt-4 pl-4">
                Add Product !!
              </h2>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}
