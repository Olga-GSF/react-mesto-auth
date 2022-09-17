import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect, useState, useContext } from 'react';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  //console.log(handleSubmit);

  return (
    <PopupWithForm name="popup popup_type_edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="popup__content">
        <input id="name-input" name="userName" type="text" className="popup__input popup__input_name_firstname"
          placeholder="Имя" required minLength="2" maxLength="40" onChange={handleChangeName} value={name || ''} />
        <span className="popup__input-error name-input-error"></span>
        <input id="description-input" name="description" type="text"
          className="popup__input popup__input_name_description" placeholder="Описание" required minLength="2"
          maxLength="200" onChange={handleChangeDescription} value={description || ''} />
        <span className="popup__input-error description-input-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
