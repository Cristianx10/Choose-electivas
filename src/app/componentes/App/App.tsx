import React from "react";
import { connect } from "react-redux";

import Header from "../Header/Header";
import Login from "../../containers/Login/Login";
import Desktop from '../Desktop/Desktop';
import BarOption from "../BarOption/BarOption";

import { IStore } from '../../redux/store';
import { INavegation } from '../../redux/navegation/navegation';

import "./App.scss";


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

    <section className="App">

      <article className="App__header">
        <Header />
      </article>
      <article className="App__body">

        <section className="App__body__bar">
          <BarOption />
        </section>

        <section className="App__body__page">
          {rederPage(navegation.url)}
        </section>
      </article>

    </section>
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