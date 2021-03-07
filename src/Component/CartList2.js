import React from 'react';

class CartList2 extends React.Component {
  render() {
    return (
      <div className="daftarBelanja">
        <h6 className="font-weight-normal">{this.props.nama}</h6>
        <h6 className="font-weight-light">{this.props.subtotal}</h6>
      </div>
    );
  }
}

export default CartList2;
