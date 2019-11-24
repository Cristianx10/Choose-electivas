import React from "react";
import { connect } from 'react-redux';
import { IStore } from '../../redux/store';
import { IUser } from '../../redux/user/user';
import Card from '../Card/Card';
import setNumUserSimilars from '../../redux/user/actions/setNumUserSimilars';

import "./Desktop.scss";

interface IPropsDesktop {
    user: IUser
    setNumUserSimilars: Function
}

const Desktop = (props: IPropsDesktop) => {

    const { user, setNumUserSimilars } = props;

    return <article className="Desktop">
        <article className="Desktop__container">

            <section className="Desktop__container__user">
                <article className="Desktop__container__user__title">
                    <section className="profile">
                        <div className="profile__title">
                            <h1>Perfil de Usuario</h1>
                            <h2>{user.name}</h2>
                        </div>
                        <div className="profile__icon">
                            <img src="/img/icon/icon-user-medium.png" alt="" />
                        </div>
                    </section>
                </article>
                <article className="Desktop__container__user__information">
                    {user.userInformation.map((info, i) => {
                        let view = <></>;
                        if (info.value <= 10) {
                            view = <div className="CellValue" key={i}>
                                <div>{info.title}</div>
                                <progress value={info.value} max="10" />

                            </div>
                        }
                        return view;
                    })}
                </article>

            </section>
            <section className="Desktop__container__recomend">
                <div className="Desktop__container__recomend__config">
                    <h1>Usuarios Recomendados</h1>
                    <input onChange={(e) => { setNumUserSimilars(parseInt(e.target.value)) }} type="number" />

                </div>
                <div className="Desktop__container__recomend__list">
                    {user.similarsUsers.map((result, i) => {
                        return <Card referencia={result} key={i} />
                    })}
                </div>
            </section>

        </article>
    </article>
}

const mapStateToProps = (store: IStore) => {
    return {
        user: store.user
    }
}

const mapActionsToProps = {
    setNumUserSimilars
}

export default connect(mapStateToProps, mapActionsToProps)(Desktop);