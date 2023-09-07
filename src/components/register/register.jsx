import { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { parseErrors } from "../../utils/parseErrors";
import Alert from "../alert/alert";

export default function register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //error messages
  const [alert, setAlert] = useState({});

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setAlert({
        message: "password and confirm password do not match",
      });
      return false; //exit early
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if password and confirm password match
    if (!validateConfirmPassword) return false;

    const data = {
      firstName,
      lastName,
      email,
      username: email,
      password,
      confirmPassword,
    };

    console.log(data);

    try {
      await axios.post("http://localhost:1337/api/auth/local/register", data);

      //Reset our state
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setAlert({
        message: "Account created successfully",
        details: [],
        type: "success",
      });
      setConfirmPassword("");
    } catch (err) {
      setAlert(parseErrors(err));
    }
  };

  return (
    <>
      <Alert data={alert} />

      <form className="form form--page" onSubmit={handleSubmit}>
        <div className="form__group form__group--page">
          <label className="form__label">First name</label>
          <input
            className="form__field"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Last name</label>
          <input
            className="form__field"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

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
          <label className="form__label">Choose password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Choose password"
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Register" />
        </div>

        <footer>
          Already have an account? <Link to="/login">Login</Link>
        </footer>
      </form>
    </>
  );
}
