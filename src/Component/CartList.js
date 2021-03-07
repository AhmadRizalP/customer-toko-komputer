import React from 'react';

export default class CartList extends React.Component {
  render() {
    return (
      <div className="box mb-1">
        <img
          className="img-rounded"
          src={this.props.image}
          width="130"
          height="130"
          alt="..."
        />
        <div className="boxleft ml-3">
          <div className="info">
            <div className="judul">
              <h4>{this.props.nama}</h4>
            </div>
            <div className="ket">
              <h6 className="font-weight-normal">Price :</h6>
              <p>{this.props.price}</p>
            </div>
          </div>
        </div>
        <div className="boxright">
          <div className="jumlah">
            <button className="plusmin" onClick={this.props.minus}>
              <i className="fas fa-minus"></i>
            </button>
            <input
              value={this.props.qty}
              disabled
              onChange={this.props.quanty}
              type="text"
              name="jumlah"
            />
            <button className="plusmin" onClick={this.props.plus}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <div className="subtotal">
            <h6 className="text-right">SubTotal</h6>
            <p className="text-right">{this.props.subTotal}</p>
            <div className="tombol">
              <button
                className="btn btn-sm buttondelete"
                onClick={this.props.drop}
              >
                DELLETE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
