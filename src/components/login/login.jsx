import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss";
import axios from "axios";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const data = {
      email,
      password,
      username: email,
    };

    setEmail("");
    setPassword("");
  };

  return (
    <form className="form form--page" onSubmit={handleSubmit}>
      <div className="form__group form__group--page">
        <label className="form__label">Email</label>
        <input
          className="form__field"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form__group form__group--page">
        <label className="form__label">Password</label>
        <input
          className="form__field"
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form__group form__group--page">
        <input className="form__btn" type="submit" value="Login" />
      </div>

      <footer>
        Dont have an account? <Link to="/register">Register</Link>
      </footer>
    </form>
  );
}
