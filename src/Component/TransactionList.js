import React from 'react';
export default class TransactionList extends React.Component {
  getAmount = (products) => {
    let total = 0;
    products.map((it) => (total += Number(it.price) * Number(it.qty)));
    return total;
  };

  convertTime = (time) => {
    let date = new Date(time);
    return `${date.getDate()}/${
      Number(date.getMonth()) + 1
    }/${date.getFullYear()}`;
  };

  render() {
    return (
      <div>
        {/* list */}
        <div className="card col-sm-12 my-2">
          <div className="card-body row">
            <div className="col-lg-4 col-sm-12">
              <small className="text-warning">Customer</small>
              <h6 className="text-white">{this.props.customer_name}</h6>
            </div>
            <div className="col-lg-4 col-sm-12">
              <small className="text-warning">Address</small>
              <h6 className="text-white">{this.props.customer_address}</h6>
            </div>
            <div className="col-lg-2 col-sm-12">
              <small className="text-warning">Total Amount</small>
              <h6 className="text-danger">
                Rp {this.getAmount(this.props.products)}
              </h6>
            </div>
            <div className="col-lg-2 col-sm-12">
              <small className="text-bold text-white">
                Time: {this.convertTime(this.props.time)}
              </small>
              <button
                className="btn btn-sm btn-block btn-light"
                data-toggle="modal"
                data-target={`#modalDetail${this.props.transaction_id}`}
              >
                Details
              </button>
            </div>
          </div>
        </div>
        {/* modal component */}
        <div
          className="modal fade mt-5"
          id={`modalDetail${this.props.transaction_id}`}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5>Detail of Transaction</h5>
              </div>
              <div className="modal-body">
                <h5>Customer:{this.props.customer_name}</h5>
                <h6>Time:{this.convertTime(this.props.time)}</h6>
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Product</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Qty</th>
                      <th className="text-center">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.props.products.map((item, index) => (
                      <tr key={item.product_id}>
                        <td className="text-center">{`${index + 1}`}</td>
                        <td>{item.product.name}</td>
                        <td>Rp {item.price}</td>
                        <td className="text-center">{item.qty}</td>
                        <td className="text-right">
                          Rp {item.price * item.qty}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan="4"
                        className="text-danger text-bold text-center align-items-center"
                      >
                        <h4>Total</h4>
                      </td>

                      <td className="text-right text-danger text-bold">
                        <h4>Rp {this.getAmount(this.props.products)}</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
