import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Count from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Count />, document.getElementById("root"));

registerServiceWorker();
