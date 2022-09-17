import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import api from '../utils/api';

import EditProfilePopup from './EditProfilePopup';
import RenewAvatarPopup from './RenewAvatarPopup';
import AddCardPopup from './AddCardPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {

  const [renewAvatarPopup, renewAvatarPopupOpen] = useState(false);
  const [editProfilePopup, editProfilePopupOpen] = useState(false);
  const [addCardPopup, addCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getUserData(),

      api.getInitialCards(),
    ])
      .then(([data, cards]) => {
        setCurrentUser(data);

        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleEditAvatarClick() {
    renewAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    editProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    addCardPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    renewAvatarPopupOpen(false)
    editProfilePopupOpen(false)
    addCardPopupOpen(false)
    setSelectedCard({})
  }

  function handleCardLike(cards) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = cards.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(cards._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === cards._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleDeleteCard(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => { //создаем копию массива, исключив из него удалённую карточку
          return item._id !== card._id
        }))
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleUpdateUser(data) {
    api.setUserData(data.name, data.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(data) {
    api.setAva(data)
      .then((dataAvatar) => {
        setCurrentUser(dataAvatar)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateCard(card) {
    api.createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">

        <div className="page center">

          <Header />

          <Main onRenewAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddCard={handleAddPlaceClick} onCardClick={handleCardClick} handleCardLike={handleCardLike} handleDeleteCard={handleDeleteCard} cards={cards} />

          <Footer />

          <EditProfilePopup isOpen={editProfilePopup} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddCardPopup isOpen={addCardPopup} onClose={closeAllPopups} onAddCard={handleUpdateCard} />

          <RenewAvatarPopup isOpen={renewAvatarPopup} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <ImagePopup onClose={closeAllPopups} card={selectedCard} />

          <PopupWithForm name="popup_type_sure" title="Вы уверены?" buttonText="Да" />

        </div>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
