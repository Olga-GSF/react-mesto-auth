import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import Login from './Login.js';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import EditProfilePopup from './EditProfilePopup';
import RenewAvatarPopup from './RenewAvatarPopup';
import AddCardPopup from './AddCardPopup';
import PopupWithBurger from './PopupWithBurger';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Switch, Route, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';

function App() {

  const [renewAvatarPopup, renewAvatarPopupOpen] = useState(false);
  const [editProfilePopup, editProfilePopupOpen] = useState(false);
  const [addCardPopup, addCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loggedIn && Promise.all([
      api.getUserData(),
      api.getInitialCards(),
    ])
      .then(([data, cards]) => {
        console.log(data);
        console.log(cards);
        setCurrentUser(data);

        setCards(cards.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [loggedIn])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        })
    }
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
    setInfoTooltipOpen(false)
  }

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  useEffect(() => {
    const closeOverlay = (evt) => {
      if (evt.target.classList.contains('popup')) {
        closeAllPopups();
      }
    }
    document.addEventListener('mousedown', closeOverlay)

    return () => document.removeEventListener('mousedown', closeOverlay)
  }, [])

  function handleMenuClick() {
    setMenuOpen(!isMenuOpen)
  }

  function handleCardLike(cards) {
    console.log(cards);
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = cards.likes.some(i => i === currentUser.data._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(cards._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === cards._id ? newCard.data : c));
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
        setCards([...cards, newCard.data]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleRegistration(email, password) {
    auth.register(email, password)
      .then((data) => {
        if (data) {
          setStatus(true)
          setInfoTooltipOpen(true)
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setStatus(false)
        setInfoTooltipOpen(true)
        console.log(err);
      })
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setEmail(email)
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        setInfoTooltipOpen(true)//открываем попап InfoTooltip
        console.log(err);
      })
  }

  // function handleLogin(email, password) {
  //   auth.login(email, password)
  //     .then((data) => {
  //       if (data.token) {
  //         console.log(data.token);
  //         localStorage.setItem('token', data.token)
  //         setEmail(email);
  //         setLoggedIn(true);
  //         history.push('/');
  //       }
  //     })
  //     .catch((err) => {
  //       setInfoTooltipOpen(true);
  //       console.log(err);
  //     })
  // }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
    setMenuOpen(!isMenuOpen)
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">

        <PopupWithBurger isOpen={isMenuOpen} onClose={closeAllPopups} onLogOut={handleLogOut} email={email} />

        <div className="page center">

          <Header onLogOut={handleLogOut} email={email} loggedIn={loggedIn} onBurger={handleMenuClick} />

          <Switch>
            <ProtectedRoute exact path="/"
              onRenewAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddCard={handleAddPlaceClick} onCardClick={handleCardClick} handleCardLike={handleCardLike} handleDeleteCard={handleDeleteCard} cards={cards}
              component={Main}
              loggedIn={loggedIn}
            />

            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>

            <Route path="/sign-up">
              <Register handleRegistration={handleRegistration} />
            </Route>

          </Switch>

          {loggedIn && <Footer />}

          <EditProfilePopup isOpen={editProfilePopup} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddCardPopup isOpen={addCardPopup} onClose={closeAllPopups} onAddCard={handleUpdateCard} />

          <RenewAvatarPopup isOpen={renewAvatarPopup} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <ImagePopup onClose={closeAllPopups} card={selectedCard} />

          <PopupWithForm name="popup_type_sure" title="Вы уверены?" buttonText="Да" />

          <InfoTooltip isOpen={isInfoTooltipOpen} status={status} onClose={closeAllPopups} />

        </div>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
