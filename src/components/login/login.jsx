import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <form class="form form--page" onSubmit={handleSubmit}>
      <div class="form__group form__group--page">
        <label class="form__label">Email</label>
        <input
          class="form__field"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div class="form__group form__group--page">
        <label class="form__label">Password</label>
        <input
          class="form__field"
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div class="form__group form__group--page">
        <input class="form__btn" type="submit" value="Login" />
      </div>

      <footer>
        Dont have an account? <Link to="/register">Register</Link>
      </footer>
    </form>
  );
}
