import React, { useContext, useState } from "react";
import { UserContext } from '../../hook/UserContext';
import "./Header.scss";
import { connect } from "react-redux";
import { IStore } from '../../redux/store';
import { IUser } from '../../redux/user/user';
import setUserPrincipal from '../../redux/user/actions/setUserPrincipal';

interface IPropsHeader { user: IUser, setUserPrincipal: Function }

const Header = (props: IPropsHeader) => {

    const userName = props.user.name;
    const { setUserPrincipal, user } = props;

    const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let name = event.target.value;
        setUserPrincipal(name)
        setIsChangeUser(false);
    }

    const [isChangeUser, setIsChangeUser] = useState(false)


    return <article className="Header">
        <section className="Header__container">
            <h1 className="logo">Choose!</h1>

            <div className="Header__container__user" onMouseOut={() => setIsChangeUser(false)}>
                <div>
                    {isChangeUser ?
                        <select onInput={selectUser} name="" id="" defaultValue={user.name}>
                            {user.usuarios.map((user, i) => {
                                return <option key={i}>{user}</option>
                            })}
                        </select>
                        :
                        <h1 onClick={() => setIsChangeUser(true)}>{userName}</h1>
                    }

                </div>
                <img src="img/icon/icon-user.svg" alt="" />
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


