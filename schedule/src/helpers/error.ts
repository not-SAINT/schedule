const serverError = (message: string) => {
  const newError: { message: string } = { message: '' };
  Object.assign(newError, Error);
  newError.message = `server Error: ${message}`;
};

export default serverError;
