import React from "react";
import { connect, } from 'react-redux';
import { IStore } from '../../redux/store';
import { IUser } from '../../redux/user/user';
import Card from '../Card/Card';
import setNumUserSimilars from '../../redux/user/actions/setNumUserSimilars';

import "./Desktop.scss";
import { IKnn, KNN_ACTION, knnPersonas, knnLugares } from '../../redux/knn/knnAdmin';
import knnAction from '../../redux/knn/actions/knnAction';
import setKnnObserver from '../../redux/knn/actions/setKnnObserver';

interface IPropsDesktop {
    user: IUser;
    knn: IKnn;
    setNumUserSimilars: Function;
    knnAction: Function;
    setKnnObserver: Function;
}

const Desktop = (props: IPropsDesktop) => {

    const { user, setNumUserSimilars } = props;

    const { knn, knnAction, setKnnObserver } = props;




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

                        if (info.value <= 10) {
                            return <div className="CellValue" key={i}>
                                <div>{info.title}</div>
                                <progress value={info.value} max="10" />

                            </div>
                        }

                    })}
                </article>

            </section>
            <section className="Desktop__container__recomend">
                <div className="Desktop__container__recomend__navegation">
                    <nav className="navegation">
                        <ul>
                            <li onClick={() => setKnnObserver(knnPersonas)}><a>Personas</a></li>
                            <li onClick={() => setKnnObserver(knnLugares)}><a>Materias</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="Desktop__container__recomend__config">
                    <h1>Usuarios Recomendados</h1>
                    <input onChange={(e) => { setNumUserSimilars(parseInt(e.target.value)) }} type="number" />
                </div>
                <div className="Desktop__container__recomend__list">
                    {user.knnObserver === knnPersonas ?
                        <div className="personas">
                            {user.similarsUsers.map((result, i) => {
                                return <Card referencia={result} state={false} key={i} />
                            })}
                        </div>
                        :
                        <section className="lugares">
                            {user.similarsUsers.map((result, i) => {
                                return <Card referencia={result} state={false} key={i} />
                            })}
                        </section>
                    }
                </div>
            </section>

        </article>
    </article >
}

const mapStateToProps = (store: IStore) => {
    return {
        user: store.user,
        knn: store.knnAdmin
    }
}

const mapActionsToProps = {
    setNumUserSimilars,
    knnAction,
    setKnnObserver
}

export default connect(mapStateToProps, mapActionsToProps)(Desktop);