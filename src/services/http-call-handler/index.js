// @flow
export default async function http(url: String, options: Object = {}) {
  try {
    let response = await fetch(url, options);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
    return ({ error: error });
  }
}