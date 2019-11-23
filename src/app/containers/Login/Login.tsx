import React from "react";

import { connect } from "react-redux";
import setUserPrincipal from '../../redux/user/actions/setUserPrincipal';
import setUrlPage from "../../redux/navegation/actions/serUrlPage";
import { IStore } from '../../redux/store';
import { IUser } from '../../redux/user/user';

import "./Login.scss";
import { PAGE } from '../../App';

interface IPropsLogin { users: IUser, setUrlPage?: Function, setUserPrincipal?: Function }

const Login = (props: IPropsLogin) => {

    const { users, setUserPrincipal, setUrlPage } = props;


    const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let name = event.target.value;
        setUserPrincipal(name)
        setUrlPage(PAGE.DESKTOP);
    }

    return (<div className="Login display__background" style={{ backgroundImage: "url('/img/background/background-principal.png')" }} >
        <div className="Login__container">
            <div className="Login__container__select">
                <select onChange={selectUser} name="" id="" className="scroll" value={users.name}>
                    <option>Seleccion una opcion</option>
                    {users.usuarios.map((user, i) => {
                        return <option key={i}>{user}</option>
                    })}
                </select>
            </div>
            <div>
                <img src="/img/icon/icon-user-big.png" alt="" />
            </div>
        </div>


    </div>);

}

const mapStateToProps = (state: IStore) => {
    return {
        users: state.user,
    }
}

const mapDispacthToProps = {
    setUserPrincipal,
    setUrlPage
}


export default connect(mapStateToProps, mapDispacthToProps)(Login);