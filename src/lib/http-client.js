// Client to fetch (lol) dogs from api
class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  fetch(path = '') {
    return fetch(`${this.baseUrl}${path}`)
      .then(r => r.json())
      .then(({ message, status }) => ({
        [Array.isArray(message) ? 'dogUrls' : 'breeds']: message,
        status
      }))
      .catch(() => ({ error: 'There was an error fetching '}))
    };
}

export default HttpClient;