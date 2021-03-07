import React from 'react';

export default class ProductList extends React.Component {
  render() {
    return (
      <div className="m-3">
        <div className="card cardp">
          <img
            src={this.props.image}
            className="img"
            height="240"
            width="240"
            alt={this.props.name}
          />
          <div className="card-body">
            <div className="">
              <h5 className="text-white">{this.props.name}</h5>
              <h6 className="text-white font-weight-normal">
                Price: {this.props.price}
              </h6>
              <h6 className="text-white font-weight-normal">
                Stock: {this.props.stock}
              </h6>
              <button
                className="btn btn-sm btntambah mt-3"
                onClick={this.props.onCart}
              >
                Tambahkan ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
