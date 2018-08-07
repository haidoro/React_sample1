import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

class Count extends React.Component{
	constructor(props) {
	  super(props);	
	  this.state = {number: 0};
	}

	render(){
		return(
			<div>
				<h1>カウンター</h1>
				<div className="wrap">
				<div className="num">{this.state.number}</div>
				<div className="button-area">
					<button className="plus" onClick={this.onPlusClick}>+</button>
					<button className="minus" onClick={this.onMinusClick}>-</button>
					<button className="reset" onClick={this.onResetClick}>reset</button>
				</div>
				</div>
			</div>
			);
	}
	onPlusClick = () =>{
		this.setState({number:this.state.number + 1})
	}
	onMinusClick = () =>{
		this.setState({number:this.state.number - 1})
	}
	onResetClick = () =>{
		this.setState({number:0})
	}
}

ReactDOM.render(<Count />, document.getElementById("root"));

registerServiceWorker();
