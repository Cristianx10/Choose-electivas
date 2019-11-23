import React from "react";

import Header from "./componentes/Header/Header";
import { connect } from "react-redux";

import Login from "./containers/Login/Login";

import { IStore } from './redux/store';
import { INavegation } from './redux/navegation/navegation';
import Desktop from './componentes/Desktop/Desktop';

import "./style/style.scss";
import "./style/animations.scss";

interface IPropsApp { navegation: INavegation }

const App = (props: IPropsApp) => {

  const { navegation } = props;


  const rederPage = (page: string) => {
    var view = <></>;
    switch (page) {
      case PAGE.HOME:
        view = <Login />
        break;
      case PAGE.DESKTOP:
        view = <Desktop />
        break;
      default:
        view = <Login />
        break;
    }
    return view;
  }

  return (

    <>
      <Header />

      {rederPage(navegation.url)}
    </>
  );
}

const mapStateToProps = (state: IStore) => {
  return (
    {
      navegation: state.navegation
    }
  );
}

export default connect(mapStateToProps)(App);

export var PAGE = {
  HOME: "HOME", 
  DESKTOP: "DESKTOP"

}