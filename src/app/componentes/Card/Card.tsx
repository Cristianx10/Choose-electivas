import React from "react";
import KnnUser from '../../objects/Knn/KnnUser';
import "./Card.scss";

interface IPropsCard { referencia: KnnUser }

const Card = (props: IPropsCard) => {

    const { nombre, distance } = props.referencia;

    return <div className="Card">
        <h1>{nombre}</h1>
        <h1>{distance.toFixed(4)}</h1>
    </div>
}

export default Card;