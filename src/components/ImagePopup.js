function ImagePopup(props) {

  return (
    <div className={`popup popup_type_big-image} ${props.card._id && 'popup_is-open'}`}>
      <div className="popup__content popup__content_optionally_bigimage">
        <figure className="popup__image-container">
          <img alt={props.card && props.card.name} src={props.card && props.card.link} className="popup__big-image" />
          <figcaption className="popup__image-title">{props.card && props.card.name}</figcaption>
          <button aria-label="close" type="button" className="button popup__button-close" onClick={props.onClose}></button>
        </figure>
      </div >
    </div>
  )
}

export default ImagePopup;