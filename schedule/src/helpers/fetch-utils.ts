import serverError from './error';

export const getRequest = async (url: string): Promise<any> => {
  try {
    const rawResponse = await fetch(url);
    if (rawResponse.ok) {
      return await rawResponse.json();
    }
    return serverError(String(rawResponse.status));
  } catch (err) {
    return err;
  }
};

export const postRequest = async (url: string, body: string): Promise<any> => {
  try {
    const rawResponse = await fetch(url, {
      method: 'POST',
      body,
    });

    if (rawResponse.ok) {
      return await rawResponse.json();
    }
    return serverError(String(rawResponse.status));
  } catch (err) {
    return err;
  }
};

export const putRequest = async (url: string, body: string): Promise<any> => {
  try {
    const rawResponse = await fetch(url, {
      method: 'PUT',
      body,
    });
    if (rawResponse.ok) {
      return await rawResponse.json();
    }
    return serverError(String(rawResponse.status));
  } catch (err) {
    return err;
  }
};

export const deleteRequest = async (url: string): Promise<any> => {
  try {
    const rawResponse = await fetch(url, {
      method: 'DELETE',
    });
    if (rawResponse.ok) {
      return await rawResponse.json();
    }
    return serverError(String(rawResponse.status));
  } catch (err) {
    return err;
  }
};
