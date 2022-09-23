import React from "react";
import logo from '../img/VectorLogoWi.svg';
import burger from '../img/burger.svg';
import { useLocation, Link } from "react-router-dom";

function Header(props) {
  const { pathname } = useLocation();
  const textTitle = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const path = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;
  return (
    <header className="header">
      <img src={logo} alt="лого" className="logo logo_place_header" />
      <div>
        {props.loggedIn ?
          (<div className="header__container">
            <p className="header__user-email">{props.email}</p>
            <Link className="header__exit" to="" onClick={props.onLogOut}>Выйти</Link>
          </div>) : (<Link to={path} className="auth__head-link">{textTitle}</Link>)
        }
      </div>
      {props.loggedIn ?
        (<img className="header__burg-menu" alt='бургер-меню' src={burger} onClick={props.onBurger} />) : ('')}
    </header>
  )
}

export default Header;