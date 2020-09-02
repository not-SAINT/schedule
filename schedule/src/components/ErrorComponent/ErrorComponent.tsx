import React from 'react';

const ErrorComponent: React.SFC = () => {
  const throwError = () => {
    throw new Error('some error');
  };

  return (
    <>
      error test component
      {throwError()}
    </>
  );
};

export default ErrorComponent;
