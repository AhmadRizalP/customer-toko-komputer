import React from 'react';
import axios from 'axios';
import { base_url } from '../Config.js';
import './Pages.css';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: '',
      logged: true,
    };
  }

  Login = (event) => {
    event.preventDefault();
    let sendData = {
      username: this.state.username,
      password: this.state.password,
    };

    let url = base_url + '/customer/auth';
    axios
      .post(url, sendData)
      .then((response) => {
        this.setState({
          logged: response.data.logged,
        });
        if (this.state.logged) {
          localStorage.setItem('customer', JSON.stringify(response.data.data));
          localStorage.setItem('token', response.data.token);
          this.props.history.push('/');
        } else {
          this.setState({
            message: response.data.message,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <div className="container">
        <div className="login">
          <div className="lleft pt-5">
            <div className="mt-5">
              <h4 className="pt-5">MOKLET</h4>
              <h4>COMPUTER STORE</h4>
            </div>
          </div>
          <div className="lright">
            <form onSubmit={(ev) => this.Login(ev)}>
              <input
                type="text"
                className="input mb-3"
                value={this.state.username}
                onChange={(ev) => this.setState({ username: ev.target.value })}
                placeholder="Username"
              />
              <input
                type="password"
                className="input mb-4"
                value={this.state.password}
                onChange={(ev) => this.setState({ password: ev.target.value })}
                autoComplete="false"
                placeholder="Password"
              />

              <button
                className="btn-login btn btn-block text-white mb-1"
                type="submit"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
