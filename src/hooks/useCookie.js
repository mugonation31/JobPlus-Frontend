import cookie from "js-cookie";
import jwt_decode from "jwt-decode";

const AUTH_KEY = "jobplus-token";

export const useCookie = () => {
  const saveAuthCookie = (token, expires = 4 / 24) => {
    // set the jwt in a cookie
    cookie.set(AUTH_KEY, token, { expires: expires }); //expires in 4 hours
  };

  const deleteAuthCookie = () => {
    cookie.remove(AUTH_KEY);
  };

  const getAuthCookie = () => {
    return cookie.get(AUTH_KEY); // => 'value'
  };

  const isAuthCookieExpired = () => {
    const token = getAuthCookie();
    if (!token) return true;
    const { exp } = jwt_decode(token);
    const currentTime = Date.now() / 1000; // give us current time in milliseconds
    return exp < currentTime; // tells is Cookie has expired - returns true if expired
  };

  const hasValidAuthCookie = () => {
    return !isAuthCookieExpired(); // isAuthCookie not Expired?
  };

  return {
    saveAuthCookie,
    deleteAuthCookie,
    getAuthCookie,
    isAuthCookieExpired,
    hasValidAuthCookie,
  };
};
