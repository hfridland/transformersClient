
// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } /*else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    }*/ else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(method, url, body, error, success) {
  // This is a sample server that supports CORS.
  //var url = 'http://192.168.1.109:8080/bots/';

  //var xhr = createCORSRequest('GET', url);
  var xhr = createCORSRequest(method, url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function () {
    let obj;
    try {
      obj = JSON.parse(xhr.responseText)
    } catch {
      obj = {};
    }

    success(obj, xhr.status);
    //var text = JSON.parse(xhr.responseText);
    //var title = getTitle(text);
    //alert('Response from CORS request to ' + url + ': ' + text);
  };

  xhr.onerror = function (err) {
    error(err);
    //alert('Woops, there was an error making the request.');
  };

  xhr.setRequestHeader('Content-type', 'application/json');

  xhr.send(JSON.stringify(body));
}

export default makeCorsRequest;