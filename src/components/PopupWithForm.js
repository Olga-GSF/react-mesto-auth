import React from 'react'

function PopupWithForm({ name, title, isOpen, onClose, onSubmit, buttonText, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_is-open'}`}>
      <div className="popup__content">
        <button aria-label="close" type="button" className="button popup__button-close" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <form name={name} id="profileForm" action="#" className="popup__form popup__form_place_edit" noValidate onSubmit={onSubmit}>
          {children}
          <button type="submit" className="button popup__button-submit">{buttonText}</button>
        </form>
      </div>
    </div>

  )
}

export default PopupWithForm;