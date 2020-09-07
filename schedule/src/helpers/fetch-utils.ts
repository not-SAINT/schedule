import serverError from './error';

export const getRequest = async <T>(url: string): Promise<T> => {
  const rawResponse = await fetch(url);
  if (rawResponse.ok) {
    const response = await rawResponse.json();
    return response;
  }
  throw serverError(String(rawResponse.status));
};

export const postRequest = async <T>(url: string, body: string): Promise<T> => {
  const rawResponse = await fetch(url, {
    method: 'POST',
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
  });
  if (rawResponse.ok) {
    const response = await rawResponse.json();
    return response;
  }
  throw serverError(String(rawResponse.status));
};
