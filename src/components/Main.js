import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onRenewAvatar, onEditProfile, onAddCard, onCardClick, handleCardLike, handleDeleteCard, cards }) {
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile center">
        <div className="profile__info">
          <div className="profile__edit-wrapper">
            <button type="button" className="profile__overlay" onClick={onRenewAvatar}></button>
            <img src={currentUser.avatar} alt="аватар" className="profile__avatar" />
          </div>
          <div className="profile__wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button aria-label="edit" type="button" className="button profile__button-edit" onClick={onEditProfile}></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button aria-label="add" className="button profile__button-add" onClick={onAddCard}></button>
      </section>

      <section className="cards center">
        <ul className="cards__items">
          {
            cards.map((card) => (
              <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleDeleteCard} />
            ))
          }
        </ul>
      </section>

    </main>
  )
}

export default Main;