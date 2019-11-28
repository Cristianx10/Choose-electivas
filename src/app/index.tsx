import React from "react";
import { render } from 'react-dom';
import App from "./componentes/App/App";

import { Provider } from "react-redux";
import Store from './redux/store';

import "./style/style.scss";
import "./style/animations.scss";
import "./style/reset.scss";



render(<Provider store={Store}>
    <App />
</Provider>, document.getElementById('app'));