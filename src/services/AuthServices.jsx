import { useApi } from "../hooks/useApi";

const authServices = () => {
  const { post } = useApi();

  //registerUser method
  const registerUser = async (userData, onSuccess, onFailure) => {
    await post("auth/local/register", {
      data: userData,
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

  return {
    registerUser,
    loginUser,
  };
};

export default authServices;
