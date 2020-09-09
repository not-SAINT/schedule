import React from 'react';
import { Alert } from 'antd';

type ErrorFallbackProps = {
  error: any;
  componentStack: any;
  resetErrorBoundary: any;
};

const ErrorFallback: React.FC<any> = ({ error, componentStack, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <>
      <Alert message={error} description={componentStack} type="error" />

      {resetErrorBoundary && (
        <button type="button" onClick={resetErrorBoundary}>
          Try again
        </button>
      )}
    </>
  );
};

export default ErrorFallback;
