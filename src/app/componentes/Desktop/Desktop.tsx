import React from "react";
import { connect, useDispatch, useSelector, } from 'react-redux';
import { IStore } from '../../redux/store';
import { IUser } from '../../redux/user/user';
import Card from '../Card/Card';
import { type as setNumUserSimilars } from '../../redux/user/actions/setNumUserSimilars';

import "./Desktop.scss";
import { IKnn, KNN_ACTION } from '../../redux/knn/knnAdmin';
import knnAction from '../../redux/knn/actions/knnAction';
import setKnnObserver from '../../redux/knn/actions/setKnnObserver';
import { knnNameElectivas, knnNameLugares } from '../../redux/knn/databaseFiles';

interface IPropsDesktop {
    knn: IKnn;
    knnAction: Function;
    setKnnObserver: Function;
}

const Desktop = (props: IPropsDesktop) => {

    const user = useSelector((store: IStore) => store.user);


    const { knn, knnAction, setKnnObserver } = props;

    const dispatch = useDispatch();

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
                            <li onClick={() => setKnnObserver(knnNameElectivas)}><a className={user.knnObserver === knnNameElectivas ? "select" : ""}>Personas</a></li>
                            <li onClick={() => setKnnObserver(knnNameLugares)}><a className={user.knnObserver === knnNameLugares ? "select" : ""}>Materias</a></li>
                            <li ><a>Mix</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="Desktop__container__recomend__config">
                    <h1>Usuarios Recomendados</h1>
                    <div className="Desktop__container__recomend__config__filter">
                        <h2>Filtrar:</h2>
                        <input onChange={(e) => { dispatch({ type: setNumUserSimilars, payload: parseInt(e.target.value) }) }} type="number" defaultValue={user.numSimilarsUsers} />
                    </div>
                </div>
                <div className="Desktop__container__recomend__list">
                    {user.knnObserver === knnNameElectivas ?
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
        knn: store.knnAdmin
    }
}

const mapActionsToProps = {
    knnAction,
    setKnnObserver
}

export default connect(mapStateToProps, mapActionsToProps)(Desktop);