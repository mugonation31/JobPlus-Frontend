import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/form.scss";
import Alert from "../alert/alert";
import { useApi } from "../../hooks/useApi";

export default function reset_password() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alert, setAlert] = useState("");

  const { post } = useApi();

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  const handleSuccess = () => {
    //reset our state
    setPassword("");
    setPasswordConfirmation("");

    //navigate to login page
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      password,
      passwordConfirmation,
      code,
    };

    await post("auth/reset-password", {
      data: data,
      onSuccess: (res) => handleSuccess(),
      onFailure: (err) => setAlert(err),
    });
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
