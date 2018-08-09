import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {member:[]};
  }

  memberList(list){
    const memberList = list.map((member,index) =>{
      return (
        <li>
          {member.name} {member.age}
        </li>
        )
    })
    return <ul>{memberList}</ul>
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.getJson}>click</button>
        {this.memberList(this.state.member)}
      </div>
    );
  }
  getJson = () => {
    const url = "https://api.myjson.com/bins/rjq9g";

    axios.get(url).then(res => {
      this.setState(res.data);
  })
  };
}

export default App;
