import cookie from "js-cookie";
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
    cookie.get(AUTH_KEY); // => 'value'
  };

  const isAuthCookieExpired = (key) => {};

  const hasValidAuthCookie = (key) => {};

  return {
    saveAuthCookie,
    deleteAuthCookie,
    getAuthCookie,
    isAuthCookieExpired,
    hasValidAuthCookie,
  };
};
