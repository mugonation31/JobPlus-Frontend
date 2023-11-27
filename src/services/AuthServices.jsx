import { useApi } from "../hooks/useApi";

const authServices = () => {
  const { post } = useApi();

  //registerUser method
  const registerUser = async (credentials, onSuccess, onFailure) => {
    await post("auth/local/register", {
      data: credentials,
      onSuccess: onSuccess,
      onFailure: onFailure,
    });
  };

  //loginUser method
  const loginUser = async (userData, onSuccess, onFailure) => {
    await post("auth/local", {
      data: userData,
      onSuccess: onSuccess,
      onFailure: onFailure,
    });
  };

  //forgotUserPassword method
  const forgotUserPassword = async (identifier, onSuccess, onFailure) => {
    await post("auth/forgot-password", {
      data: identifier,
      onSuccess: onSuccess,
      onFailure: onFailure,
    });
  };

  return {
    registerUser,
    loginUser,
    forgotUserPassword,
  };
};

export default authServices;
