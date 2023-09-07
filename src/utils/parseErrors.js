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

  //check if error is a forbidden error
  if (err?.response?.status === 403) {
    return {
      message: "Your role does not have access to this resource",
      details: [],
    };
  }

  //check for generic errors
  return {
    message: "An expected error occurred, contact support",
    details: [],
  };
};
