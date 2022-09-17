import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `card__button-delete ${isOwn ? 'card__button-delete-visible' : 'card__button-delete-hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__button-like ${isLiked ? 'button_is-active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <div className="card">
      <img src={props.card.link} alt={props.card.name} onClick={handleClick} className="card__image" />
      <button type="button" aria-label="del" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="card__title-wrap">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button type="button" aria-label="like" className={cardLikeButtonClassName} onClick={function handleLikeClick() { props.onCardLike(props.card) }}></button>
          <p className="card__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;