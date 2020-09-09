const serverError = (message: string): Error => {
  const newError: { name: string; message: string } = { message: '', name: 'serverError' };
  Object.assign(newError, Error);
  newError.message = `server Error: ${message}`;
  return newError;
};

export default serverError;
