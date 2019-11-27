import React from "react";
import { render } from 'react-dom';
import App from "./App";

import { Provider } from "react-redux";
import Store from './redux/store';

import "./style/reset.scss";



render(<Provider store={Store}>
    <App />
</Provider>, document.getElementById('app'));