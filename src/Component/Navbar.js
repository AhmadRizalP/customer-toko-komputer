import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
class Navbar extends React.Component {
  Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    window.location = '/login';
  };
  render() {
    return (
      <div>
        <header>
          <h6 className="logo">MOKLET COMPUTER STORE</h6>
          <div>
            <Link to="/" className="link">
              Product
            </Link>
            <Link to="/transactions" className="link">
              Transactions
            </Link>
            <Link to="/cart" className="link">
              Cart
            </Link>
            <Link to="/logout" className="link" onClick={() => this.Logout()}>
              Logout
            </Link>
          </div>
        </header>
      </div>
    );
  }
}
window.addEventListener('scroll', function () {
  var header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});
export default Navbar;
