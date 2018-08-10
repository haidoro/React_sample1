import React, { Component } from 'react';
import './App.css';
import { AddTodo } from "./components/AddTodo";
import { List } from "./components/List";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos:[],
      nextId:0
    }
  }

  render() {
    return (
      <div className="wrap">
      <h2>TodoApp</h2>
      <AddTodo addTodo={this.addTodo}/>
      <List deleteTodo={this.deleteTodo} todos={this.state.todos}/>
      </div>
    );
  }
  addTodo = (title) =>{
    this.setState({todos:[...this.state.todos,{id:this.state.nextId +1,title:title}],
    nextId: this.state.nextId + 1
  })
  }
  deleteTodo = id =>{
    this.setState({todos:this.state.todos.filter(todo=>{
      return todo.id !== id;
    })})
  }
}

export default App;
