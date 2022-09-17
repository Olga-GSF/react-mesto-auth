import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddCardPopup({ isOpen, onClose, onAddCard }) {

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeUrl(evt) {
    setUrl(evt.target.value);
  }

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();
    onAddCard({
      name,
      url
    });
  }

  useEffect(() => {
    setName('');
    setUrl('');
  }, [isOpen]);

  return (
    <PopupWithForm name="popup popup_type_add-card" title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleAddPlaceSubmit}>
      <div className="popup__content">
        <input id="place-input" name="name" type="text" className="popup__input popup__input_name_place"
          placeholder="Название" required minLength="2" maxLength="30" onChange={handleChangeName} value={name || ''} />
        <span className="popup__input-error place-input-error"></span>
        <input id="link-input" name="link" type="url" className="popup__input popup__input_name_link"
          placeholder="Ссылка на картинку" required onChange={handleChangeUrl} value={url || ''} />
        <span className="popup__input-error link-input-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddCardPopup;