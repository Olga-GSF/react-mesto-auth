import { Link } from "react-router-dom";

function PopupWithBurger(props) {
  return (
    <section className={`header__burg-menu_popup ${props.isOpen && 'header__burg-menu_is-open'}`}>
      <p className="header__user-email">{props.email}</p>
      <Link className="header__exit" to="" onClick={props.onLogOut}>Выйти</Link>
    </section >
  )
}

export default PopupWithBurger