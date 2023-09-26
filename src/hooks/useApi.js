import axios from "axios";
import { parseErrors } from "../utils/parseErrors";

export const useApi = () => {
  const request = async (endpoint, options = {}) => {
    try {
      await axios({
        method: options.method,
        endpoint: `http://localhost:1337/${endpoint}`,
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
