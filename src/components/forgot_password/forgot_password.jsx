import { useState } from "react";

import { Link } from "react-router-dom";
import "../styles/form.scss";
import axios from "axios";
import Alert from "../alert/alert";
import { parseErrors } from "../../utils/parseErrors";

export default function forgot_password() {
  const [email, setEmail] = useState("");

  const [alert, setAlert] = useState("");

  const resetState = () => {
    setEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
    };

    try {
      await axios.post("http://localhost:1337/api/auth/forgot-password", data);

      resetState();

      setAlert({
        message: "Please check you email for further instructions",
        type: "success",
      });
    } catch (err) {
      setAlert(parseErrors(err));
    }
  };

  return (
    <>
      <Alert data={alert} />

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
          <input className="form__btn" type="submit" value="Login" />
        </div>

        <footer>
          Already have an account? <Link to="/login">Login</Link>
        </footer>
      </form>
    </>
  );
}
