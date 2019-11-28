import React, { useState, useEffect } from "react";
import KnnUser from '../../objects/Knn/KnnUser';
import "./Card.scss";
import { useSelector } from "react-redux";
import { IStore } from '../../redux/store';
import { IUser } from '../../redux/user/user';
import { knnElectivas } from '../../redux/knn/databaseFiles';

interface IPropsCard {
    referencia: KnnUser;
    state: boolean
}

const Card = (props: IPropsCard) => {

    const { nombre, distance } = props.referencia;

    const [select, setSelect] = useState(false);

    const user = useSelector((store: IStore) => store.user );

    const chooseAction = () => {

    }

    var style = {};
 

    if(user.knnObserver === knnElectivas){
        style ={fontSize:".5em"}
    }

    const onClick = () => {
        setSelect(!select);
    }

    return <article onMouseUp={onClick} className="Card">
        <label className="Card__container">

            {select ? <section className="Card__container__select">
                <input type="checkbox" defaultChecked={false} />
            </section> : <></>}

            <section className="Card__container__info">
                <article className="Card__container__info__container">
                    <article style={style} className="Card__container__container__user">
                        <h1>{nombre}</h1>

                    </article>
                    <article className="Card__container__container__progress">
                        <h1>{distance.toFixed(4)}</h1>
                    </article>
                </article>
                <progress max={1} value={distance.toFixed(4)} />


            </section>

        </label>
    </article>
}

export default Card;

var ACTION = {
    GET_KNN_OBSERVER: "GET_KNN_OBSERVERf"
}

