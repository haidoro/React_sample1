import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

class H20 extends React.Component{
	constructor(props) {
	  super(props);	
	  this.state = {temp: 15};
	}
	H20State(temp){
		if(temp <= 0){
			return "ice";
		}else{
			return "water";
		}
	}
	render(){
		const {temp} = this.state;
		return(
				<div className={this.H20State(temp)}>
				<h2>phase: {this.H20State(temp)},{temp}</h2>
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
