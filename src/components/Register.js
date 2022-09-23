import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleRegistration(
      email,
      password
    );
  }

  return (
    <section className="auth">
      <h2 className="auth__title">
        Регистрация
      </h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__input" type="email" name="email" id="email"
          placeholder="email" onChange={handleEmailChange} value={email || ''} required />
        <input className="auth__input" type="password" name="password" id="password" placeholder="password"
          onChange={handlePasswordChange} value={password || ''} required minLength="5" maxLength="12" />
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>

        <div className="auth__head-title">
          <p className="auth__head-text">
            Уже зарегистрированы? <Link to="/sign-in" className="auth__head-link">Войти
            </Link>
          </p>
        </div>
      </form>

    </section>
  )
}

export default Register;