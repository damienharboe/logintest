import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props, context){
    super(props, context);
    this.login = this.login.bind(this)
    this.state = {
      username: "",
      password: ""
    }
  }

  login()
  {
    let query = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post("/api/login", query).then((response) => {
      alert(response.data.success)
    })
  }

  render()
  {
    return(
      <>
        <h1>Login</h1>

        <input type="text" onChange={(e) => this.setState({ username: e.target.value })} placeholder="Brugernavn" />
        <br /> <br />
        <input type="password" onChange={(e) => this.setState({ password: e.target.value })} placeholder="Kodeord" />
        <br /> <br />
        <button onClick={this.login}>Login</button>
      </>
    )
  }
}

export default App;
