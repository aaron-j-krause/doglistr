// Client to fetch (lol) dogs from api
function HttpClient(baseUrl) {
  this.baseUrl = baseUrl;
}

HttpClient.prototype.fetch = function(path, cb) {
  path = path || '';
  cb = cb || function () {};
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onSuccess);
  xhr.addEventListener('error', onError);

  xhr.open('GET', this.baseUrl + path);
  xhr.send();

  function onSuccess(e) {
    var data = {};
    var responseBody;
    var message;
    var status;

    try {
      responseBody = JSON.parse(e.target.response);
      message = responseBody.message;
      status = responseBody.status;
    } catch (err) {
      cb(err);
    }

    if (Array.isArray(message)) {
      data.dogUrls = message;
    } else {
      data.breeds = message;
    }

    data.status = status;
    cb(null, data);
  }

  function onError() {
    var err = {
      error: 'There was an error fetching'
    }

    cb(err);
  }
}

export default HttpClient;