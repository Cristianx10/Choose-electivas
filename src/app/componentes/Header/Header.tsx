import React, { useContext, useState } from "react";
import { UserContext } from '../../hook/UserContext';
import "./Header.scss";

import { connect, useSelector, useDispatch } from "react-redux";
import { IStore } from '../../redux/store';
import { IUser } from '../../redux/user/user';
import setUserPrincipal from '../../redux/user/actions/setUserPrincipal';
import BarOption from "../BarOption/BarOption";
import { knnNameElectivas, knnElectivas } from '../../redux/knn/databaseFiles';
import { type as setListNamesKnn } from '../../redux/knn/actions/setListNamesKnn';

interface IPropsHeader { user: IUser, setUserPrincipal: Function }

const Header = (props: IPropsHeader) => {

    const userName = props.user.name;
    const { setUserPrincipal, user } = props;
    const dispatch = useDispatch();

    const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let name = event.target.value;
        setUserPrincipal(name)
        console.log("Nombre cambiado")
        setIsChangeUser(false);
    }

    const [isChangeUser, setIsChangeUser] = useState(false)

    const changeListUser = () => {
        if (user.refKnnName === knnNameElectivas) {
            dispatch({ type: setListNamesKnn, payload:knnElectivas})
        }else{
            dispatch({ type: setListNamesKnn, payload:knnNameElectivas})
        }
    }


    return <article className="Header">

        <section className="Header__container">
            <h1 className="logo">Choose!</h1>

            <div className="Header__container__user" onMouseOut={() => setIsChangeUser(false)}>
                <div className="Header__container__user__list">
                    {isChangeUser ?
                        <select className="Header__container__user__list__select"  onInput={selectUser} name="" id="" defaultValue={user.name}>
                            {user.usuarios.map((user, i) => {
                                return <option key={i} value={user}>{user}</option>
                            })}
                        </select>
                        :
                        <h1 onClick={() => setIsChangeUser(true)}>{userName}</h1>
                    }

                </div>
                <img className="Header__container__user__icon" onClick={changeListUser} src={`${user.refKnnName === knnNameElectivas? "img/icon/icon-user.svg" :"img/icon/icon-book.svg"}`} alt="" />
            </div>


        </section>

    </article>
}

const mapStateToProps = (state: IStore) => {
    return {
        user: state.user,
    }
}

const mapActionsToProps = {
    setUserPrincipal
}

export default connect(mapStateToProps, mapActionsToProps)(Header);


