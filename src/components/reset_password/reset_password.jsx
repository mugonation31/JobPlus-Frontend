import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/form.scss";
import axios from "axios";
import Alert from "../alert/alert";
import { parseErrors } from "../../utils/parseErrors";

export default function reset_password() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [alert, setAlert] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const resetState = () => {
    setPassword("");
    setPasswordConfirmation("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      password,
      passwordConfirmation,
    };

    try {
      await axios.post("http://localhost:1337/api/auth/reset-password", data);

      resetState();

      navigate("/login");

      setAlert({
        message: "Password reset! Please proceed to login",
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
          <label className="form__label">Password</label>
          <input
            className="form__field"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Confirm Password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Reset Password" />
        </div>
      </form>
    </>
  );
}
