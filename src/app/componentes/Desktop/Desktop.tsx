import React from "react";
import { connect } from 'react-redux';
import { IStore } from '../../redux/store';
import { IUser } from '../../redux/user/user';
import Card from '../Card/Card';
import setNumUserSimilars from '../../redux/user/actions/setNumUserSimilars';

interface IPropsDesktop {
    user: IUser
    setNumUserSimilars: Function
}

const Desktop = (props: IPropsDesktop) => {

    const { user, setNumUserSimilars } = props;

    return <div>
        <h1>{user.name}</h1>
        <img src="/img/icon/icon-user-medium.png" alt="" />
        <input onChange={(e) => { setNumUserSimilars(parseInt(e.target.value)) }} type="number" />
        <div>
            {user.similarsUsers.map((result, i) => {
                return <Card referencia={result} key={i} />
            })}
        </div>
    </div>
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