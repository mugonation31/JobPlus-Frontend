export const parseErrors = (err) => {
  //check if the error is a validation error
  if (err?.response?.data?.error?.name === "ValidationError") {
    return {
      message: err.response.data.error.message,
      details: err.response.data.error.details.errors,
    };
  }

  // check if it is a network error
  if (err?.message === "Network Error") {
    return {
      message: "Unable to connect to the server endpoint provider",
      details: [],
    };
  }
};
