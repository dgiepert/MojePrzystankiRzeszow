import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Start from './start/Start';
import registerServiceWorker from './registerServiceWorker';

//var myfirstElement = React.createElement("h1",{className : "test"},"Hello world!");

ReactDOM.render(/*myfirstElement*//*<App/>*/<Start/>, document.getElementById('root'));
registerServiceWorker();
