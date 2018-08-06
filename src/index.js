import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

const ReturnReactElement = (props) => {
  return <div>
	  		<h2>{props.name}</h2>
	  		<p>{props.age}</p>
  		</div>
}

ReactDOM.render(<ReturnReactElement name="Tahara" age="38"/>, document.getElementById("root"));

registerServiceWorker();
