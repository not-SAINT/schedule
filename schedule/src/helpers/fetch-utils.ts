export const getRequest = async (url: string) => {
  // какой тут указать тип  возвращаемого значения??? Promise<any> ???
  try {
    const rawResponse = await fetch(url);
    const response = await rawResponse.json();
    return response;
  } catch (err) {
    return err.message;
  }
};

export const postRequest = async (url: string, body: string) => {
  try {
    const rawResponse = await fetch(url, {
      method: 'POST',
      body,
    });
    const response = await rawResponse.json();
    return response;
  } catch (err) {
    return err.message;
  }
};

export const putRequest = async (url: string, body: string) => {
  try {
    const rawResponse = await fetch(url, {
      method: 'PUT',
      body,
    });
    const response = await rawResponse.json();
    return response;
  } catch (err) {
    return err.message;
  }
};

export const deleteRequest = async (url: string) => {
  try {
    const rawResponse = await fetch(url, {
      method: 'DELETE',
    });
    const response = rawResponse.json();
    return response;
  } catch (err) {
    return err.message;
  }
};
