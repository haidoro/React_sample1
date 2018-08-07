import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

class H20 extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {temp: 15};
	}
	render(){
		return(
				<div>
				<h2>{this.state.temp}</h2>
				<button onClick={this.onPlusClick}>+</button>
				<button onClick={this.onMinusClick}>-</button>
				</div>

			);
	}
	onPlusClick = () =>{
		this.setState({temp:this.state.temp + 1})
	}
	onMinusClick = () =>{
		this.setState({temp:this.state.temp - 1})
	}
}

ReactDOM.render(<H20 />, document.getElementById("root"));

registerServiceWorker();
