import React from "react";

import "./BarOption.scss";
import { useSelector, useDispatch } from "react-redux";
import { IStore } from '../../redux/store';
import { type as setKnnObserver } from '../../redux/knn/actions/setKnnObserver';
import { knnElectivas, knnNameElectivas, knnNameLugares, knnLugares } from '../../redux/knn/databaseFiles';
import { type as setListNamesKnn } from '../../redux/knn/actions/setListNamesKnn';


const BarOption = () => {

    const dispatch = useDispatch();
    const user = useSelector((store: IStore) => store.user);

    const chooseAction = (action: string, params: string): any => {
        var change = "";
        switch (action) {
            case ACTION.SET_KNN:

                switch (params) {
                    case NAME.PERSONAS:

                        dispatch({ type: setListNamesKnn, payload: knnNameElectivas })

                        break;
                    case NAME.ELECTIVAS:

                        dispatch({ type: setListNamesKnn, payload: knnElectivas })

                        break;

                }
                break;
            case ACTION.GET_STATUS:

                switch (params) {
                    case NAME.PERSONAS:
                        if (user.refKnnName === knnNameElectivas) {
                            change = "select";
                        }
                        break;
                    case NAME.ELECTIVAS:
                        if (user.refKnnName === knnElectivas) {
                            change = "select";
                        }
                        break;

                }

                break;
        }

        switch (action) {
            case ACTION.SET_KNN:

                break;
            case ACTION.GET_STATUS:
                return change;
                break;
        }
    }

    return <section className="BarOption">
        <section className="BarOption__container">
            <article onClick={() => { chooseAction(ACTION.SET_KNN, NAME.PERSONAS) }} className={`BarOption__container__item ${chooseAction(ACTION.GET_STATUS, NAME.PERSONAS)}`}>
                Personas
            </article>
            <article onClick={() => { chooseAction(ACTION.SET_KNN, NAME.ELECTIVAS) }} className={`BarOption__container__item ${chooseAction(ACTION.GET_STATUS, NAME.ELECTIVAS)}`}>
                Electivas
            </article>
            <article className="BarOption__container__item">
                p
            </article>
        </section>

    </section>;
}

export default BarOption;


var ACTION = {
    SET_KNN: "SET_KNN",
    GET_STATUS: "GET_STATUS"
}

var NAME = {
    PERSONAS: "PERSONAS",
    ELECTIVAS: "ELECTIVAS",
    LUGARES: "LUGARES",
}