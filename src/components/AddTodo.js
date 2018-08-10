import React, { Component } from 'react';

export class AddTodo extends Component {
  constructor(props){
    super(props);
    this.state = { title:"" }
  }

  render() {
    return (
      <div>
      <h2>AddTodo</h2>
      <form onSubmit={this.handleSubmit}>
		<input type="text" value={this.state.title} onChange={this.handleChange} />
		<input type="submit" value="Add to todo list" />
      </form>
      </div>
    );
  }
  handleChange = event => {
    const title_value = event.target.value;
    this.setState({ title:title_value })
   }
  handleSubmit = event => {
  	event.preventDefault();
  	this.props.addTodo(this.state.title)
    this.setState({ title:"" })
   }
}
