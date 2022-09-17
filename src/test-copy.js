import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditAvatarPopupOpen, editAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, editProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, addPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick() {
    editAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    editProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    addPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    editAvatarPopupOpen(false)
    editProfilePopupOpen(false)
    addPlacePopupOpen(false)
    setSelectedCard({})
  }

  return (
    <div className="App">

      <Header />

      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />

      <Footer />

      <PopupWithForm name="popup_delete_card" title="Вы уверены?" buttonText="Да" />

      <PopupWithForm name="popup_change-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <label className="popup__field">
          <input
            className="popup__input popup__input-avatar"
            id="avatar"
            name="avatar"
            type="url"
            placeholder="Введите ссылку"
            required
          />
          <span className="popup__input-error avatar-input-error">Вы пропустили это поле</span>
        </label>
      </PopupWithForm>

      <PopupWithForm name="change-profile-popup" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <fieldset className="popup__fieldset">
          <label className="popup__field">
            <input
              type="text"
              required
              className="popup__input popup__input_sign_name"
              placeholder="Имя"
              name="userName"
              id="name"
              minLength="2"
              maxLength="40"
            />
            <span className="popup__input-error name-input-error">Вы пропустили это поле</span>
          </label >
          <label className="popup__field">
            <input
              type="text"
              required
              className="popup__input popup__input_sign_extra"
              placeholder="Профессия"
              name="career"
              id="career"
              minLength="2"
              maxLength="200"
            />
            <span className="popup__input-error career-input-error">Вы пропустили это поле</span>
          </label>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm name="change-card-popup" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <fieldset className="popup__fieldset">
          <label className="popup__field">
            <input
              type="text"
              required
              className="popup__input popup__input_sign_appellation"
              placeholder="Название"
              name="name"
              id="locality"
              minLength="2"
              maxLength="30"
            />
            <span className="popup__input-error locality-input-error">Вы пропустили это поле</span>
          </label>
          <label className="popup__field">
            <input
              type="url"
              name="link"
              id="link"
              required
              className="popup__input popup__input_sign_link"
              placeholder="Ссылка на картинку"
            />
            <span className="popup__input-error link-input-error">Вы пропустили это поле</span>
          </label>
        </fieldset>
      </PopupWithForm>

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

    </div>
  );
}

export default App;


