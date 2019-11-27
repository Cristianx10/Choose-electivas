import React, { useState, useEffect } from "react";
import KnnUser from '../../objects/Knn/KnnUser';
import "./Card.scss";

interface IPropsCard {
    referencia: KnnUser;
    state: boolean
}

const Card = (props: IPropsCard) => {

    const { nombre, distance } = props.referencia;

    const [select, setSelect] = useState(false);

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
                    <article className="Card__container__container__user">
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