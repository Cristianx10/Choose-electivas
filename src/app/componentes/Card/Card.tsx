import React from "react";
import KnnUser from '../../objects/Knn/KnnUser';
import "./Card.scss";

interface IPropsCard { referencia: KnnUser }

const Card = (props: IPropsCard) => {

    const { nombre, distance } = props.referencia;

    return <article className="Card">
        <section className="Card__container">
            <article className="Card__container__user">
                <h1>{nombre}</h1>

            </article>
            <article className="Card__container__progress">
                <h1>{distance.toFixed(4)}</h1>
                <progress max={1} value={distance.toFixed(4)} />
            </article>


        </section>
    </article>
}

export default Card;