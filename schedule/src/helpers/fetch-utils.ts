import serverError from './error';

export const getRequest = async <T>(url: string): Promise<T> => {
  const rawResponse = await fetch(url, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (rawResponse.ok) {
    const response = await rawResponse.json();
    return response;
  }
  throw serverError(String(rawResponse.status));
};

export const postRequest = async <T>(url: string, body: string): Promise<T> => {
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  });

  if (rawResponse.ok) {
    const response = await rawResponse.json();
    return response;
  }
  throw serverError(String(rawResponse.status));
};

export const putRequest = async <T>(url: string, body: string): Promise<T> => {
  const rawResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  });
  if (rawResponse.ok) {
    const response = await rawResponse.json();
    return response;
  }
  throw serverError(String(rawResponse.status));
};

export const deleteRequest = async <T>(url: string): Promise<T> => {
  const rawResponse = await fetch(url, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (rawResponse.ok) {
    const response = await rawResponse.json();
    return response;
  }
  throw serverError(String(rawResponse.status));
};
