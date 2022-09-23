import UnionNo from '../img/UnionNo.svg';
import UnionOk from '../img/UnionOk.svg';

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <section className={`popup ${isOpen && 'popup_is-open'}`}>
      <div className='popup__content_infotooltip'>
        <button className='button popup__button-close' type='button' onClick={onClose} aria-label="close" />
        {status ? (<>
          <img src={`${UnionOk}`} alt="Успешная регистрация" className='popup__image-infotooltip' />
          <p className='popup__message'>
            Вы успешно зарегистрировались!
          </p>
        </>)
          :
          (<>
            <img src={`${UnionNo}`} alt="Что-то пошло не так" className='popup__tooltip-img' />
            <p className='popup__message'>
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </>
          )
        }
      </div>
    </section>
  )
}

export default InfoTooltip;