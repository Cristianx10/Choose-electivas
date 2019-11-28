import React, { useState } from "react";
import { connect, useDispatch, useSelector, } from 'react-redux';
import { IStore } from '../../redux/store';
import { IUser } from '../../redux/user/user';
import Card from '../Card/Card';
import { type as setNumUserSimilars } from '../../redux/user/actions/setNumUserSimilars';

import "./Desktop.scss";
import { IKnn, KNN_ACTION } from '../../redux/knn/knnAdmin';
import knnAction from '../../redux/knn/actions/knnAction';
import setKnnObserver from '../../redux/knn/actions/setKnnObserver';
import { knnNameElectivas, knnNameLugares, knnElectivas, knnLugares } from '../../redux/knn/databaseFiles';
import BarOption from "../BarOption/BarOption";

interface IPropsDesktop {
    knn: IKnn;
    knnAction: Function;
    setKnnObserver: Function;
}

const Desktop = (props: IPropsDesktop) => {

    const user = useSelector((store: IStore) => store.user);

    const { knn, knnAction, setKnnObserver } = props;

    const [actionSearch, setActionSearch] = useState(ACTION_SEARCH.PERSON_ELECTIVA);

    const dispatch = useDispatch();

    const chooseActionSearch = (actionSearchs: string, action: string): string | void | any => {
        var view = <></>;
        var change = "";
        var description = "";
        var title = "";

        switch (actionSearchs) {
            case ACTION_SEARCH.PERSON_ELECTIVA:
                switch (action) {
                    case COM.VIEW:
                        view = <div className="personas">
                            {user.similarsUsers.map((result, i) => {
                                return <Card referencia={result} state={false} key={i} />
                            })}
                        </div>
                        break;
                    case COM.CLASS:
                        if (user.refKnnName === knnNameElectivas) {
                            if (user.knnObserver === knnNameElectivas) {
                                change = "select";
                            }
                        } else if (user.refKnnName === knnElectivas) {
                            if (user.knnObserver === knnElectivas) {
                                change = "select";
                            }
                        }
                        break;
                    case COM.CHANGE:
                        if (user.refKnnName === knnNameElectivas) {
                            setKnnObserver(knnNameElectivas)
                            // setActionSearch(ACTION_SEARCH.PERSON_ELECTIVA);
                        } else if (user.refKnnName === knnElectivas) {
                            setKnnObserver(knnElectivas)
                        }
                        break;
                    case COM.DESCRIPTION:
                        description = "Te gusta estudiar pero no sabes con quien, porque no invitas a estas personas, ellas tambien tienes facultades similares para estudiar."
                        break;
                }

                break;
            case ACTION_SEARCH.PERSON_LUGAR:
                switch (action) {
                    case COM.VIEW:
                        view = <section className="Desktop__container__recomend__list__item lugares">
                            {user.similarsUsers.map((result, i) => {
                                return <Card referencia={result} state={false} key={i} />
                            })}
                        </section>
                        break;
                    case COM.CLASS:
                      
                        if (user.refKnnName === knnNameElectivas) {
                            if (user.knnObserver === knnNameLugares) {
                                change = "select";
                            }
                        } else if (user.refKnnName === knnElectivas) {
                            if (user.knnObserver === knnNameElectivas) {
                                change = "select";
                            }
                        }
                        break;
                    case COM.CHANGE:
                        if (user.refKnnName === knnNameElectivas) {
                            setKnnObserver(knnNameLugares)
                            //setActionSearch(ACTION_SEARCH.PERSON_LUGAR);
                        } else if (user.refKnnName === knnElectivas) {
                            setKnnObserver(knnNameElectivas)
                        }

                        break;
                    case COM.DESCRIPTION:
                        description = "Quieres viajar y conocer lugares increibles pero no sabes con quien ir, estas personas cuentan con un perfil parecido al tuyo animate e invitalas a viajar contigo";
                        break;
                }
                break;
        }

        switch (action) {
            case COM.VIEW:
                return view;
                break;
            case COM.CLASS:
                return change;
                break;
            case COM.DESCRIPTION:
                return description;
                break;
        }

    }


    var title = "Usuarios Recomendados";

    var accionA = "Estudiar";
    var accionB = "Viajar";

    if (user.refKnnName === knnNameElectivas) {
        accionA = "Estudiar";
        accionB = "Viajar";
    } else if (user.refKnnName === knnElectivas) {
        accionA = "Materias";
        accionB = "Personas";
    }

    console.log(user.knnObserver)
    if (user.knnObserver === knnElectivas) {
        title = "Electivas Recomendados";
    }
    if (user.knnObserver === knnLugares) {
        title = "Lugares Recomendados";
    }

    if (user.knnObserver === knnNameElectivas || user.knnObserver === knnNameLugares) {
        title = "Usuarios Recomendados";
    }




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
                    <div className="Desktop__container__recomend__navegation__title">
                        <h1>¿Que te gustaria hacer en nuestra APP?</h1>
                    </div>
                    <div className="Desktop__container__recomend__navegation__nav">
                        <nav className="navegation">
                            <ul>
                                <li onClick={() => chooseActionSearch(ACTION_SEARCH.PERSON_ELECTIVA, COM.CHANGE)}><a className={chooseActionSearch(ACTION_SEARCH.PERSON_ELECTIVA, COM.CLASS)}>{accionA}</a></li>
                                <li onClick={() => chooseActionSearch(ACTION_SEARCH.PERSON_LUGAR, COM.CHANGE)}><a className={chooseActionSearch(ACTION_SEARCH.PERSON_LUGAR, COM.CLASS)}>{accionB}</a></li>
                                <li ><a>Mix</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="Desktop__container__recomend__navegation__title">
                        <h1>{chooseActionSearch(actionSearch, COM.DESCRIPTION)}</h1>
                    </div>

                </div>
                <div className="Desktop__container__recomend__config">
                    <h1>{title}</h1>
                    <div className="Desktop__container__recomend__config__filter">
                        <h2>Filtrar:</h2>
                        <input onChange={(e) => { dispatch({ type: setNumUserSimilars, payload: parseInt(e.target.value) }) }} type="number" defaultValue={user.numSimilarsUsers} />
                    </div>
                </div>
                <div className="Desktop__container__recomend__list">
                    {chooseActionSearch(actionSearch, COM.VIEW)}
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


var ACTION_SEARCH = {
    PERSON_ELECTIVA: "PERSON_ELECTIVA",
    PERSON_LUGAR: "PERSON_LUGAR"
}

var COM = {
    TITLE: "TITLE",
    CLASS: "CLASS",
    VIEW: "VIEW",
    CHANGE: "CHANGE",
    DESCRIPTION: "DESCRIPTION"
}