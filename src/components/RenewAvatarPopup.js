import { useRef } from "react"
import PopupWithForm from "./PopupWithForm"

function RenewAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatar = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatar.current.value)
    avatar.current.value = ''
  }

  return (
    <PopupWithForm name="popup popup_type_renew-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="popup__content">
        <input id="avatar-input" name="avatar" type="url" className="popup__input popup__input_name_avatar"
          placeholder="Ссылка на картинку" required ref={avatar} />
        <span className="popup__input-error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default RenewAvatarPopup;