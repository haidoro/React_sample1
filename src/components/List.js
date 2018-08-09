import React, { Component } from 'react';

export class List extends Component {
  constructor(props){
    super(props);
  }

  render() {
  	const list = this.props.todos.map(todo =>{
  		return (
  			<li key={todo.id}>
  			#{todo.id} {todo.title}
  			<button onClick={()=>{
  				this.props.deleteTodo(todo.id);
  			}}>
  			Delete
  			</button>
  			</li>
  			);
  	})
    return (
      <div>
      <h2>List</h2>
      <ul>{list}</ul>
      </div>
    );
  }
}
