import { useState } from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
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
    props.handleLogin(
      email,
      password
    );
  }

  return (
    <>
      <section className="auth">
        <h2
          className="auth__title">
          Вход
        </h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input className="auth__input" type="email" name="email" id="email" placeholder="email" onChange={handleEmailChange} value={email || ''} required
          />
          <input className="auth__input" type="password" name="password" id="password" placeholder="password" onChange={handlePasswordChange} value={password || ''} required
          />
          <button className="auth__button" type="submit">
            Войти
          </button>
        </form>
      </section>
    </>
  )
}

export default withRouter(Login);