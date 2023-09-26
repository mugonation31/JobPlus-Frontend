import axios from "axios";
import { parseErrors } from "../utils/parseErrors";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useApi = () => {
  const request = async (endpoint, options = {}) => {
    try {
      await axios({
        method: options.method,
        endpoint: `${BACKEND_URL}/${endpoint}`,
        data: options.data || {},
        params: options.params || {},
      });
      options.onSuccess && options.onSuccess(res);
    } catch (err) {
      options.onFailure && options.onFailure(parseErrors(err));
    }
  };

  return {
    post: (endpoint, options) =>
      request(endpoint, { ...options, method: "POST" }),
  };
};
