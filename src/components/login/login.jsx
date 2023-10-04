import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/form.scss";
import Alert from "../alert/alert";
import cookie from "js-cookie";
import { useApi } from "../../hooks/useApi";
import { useCookie } from "../../hooks/useCookie";
import { useAuth } from "../../contexts/AuthContext";

export default function login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const { setIsAuthenticated } = useAuth();
  const { saveAuthCookie, getAuthCookie } = useCookie();

  const navigate = useNavigate();
  const { post } = useApi();

  const handleSuccess = (res) => {
    // set the jwt in a cookie
    saveAuthCookie(res.data.jwt); //expires in 4 hours
    // reset our state
    setIdentifier("");
    setPassword("");
    //set the authenticated state to true
    setIsAuthenticated(true);
    // Navigate to home page
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await post("auth/local", {
      data: { identifier, password },
      onSuccess: (res) => handleSuccess(res),
      onFailure: (err) => setAlert(err),
    });
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
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page" onClick={getAuthCookie}>
          <input className="form__btn" type="submit" value="Login" />
        </div>

        <footer>
          Don't have an account? <Link to="/register">Register</Link> or
          <Link to="/forgot-password"> Forgot Password</Link>
        </footer>
      </form>
    </>
  );
}
