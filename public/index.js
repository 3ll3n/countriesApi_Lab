var makeRequest = function(url, callback) {
// create a new xml http request object
  var request = new XMLHttpRequest();

// set the type of request and the url
  request.open("GET", url);

// set the callback we want it to use when the request is complete
  request.onload = callback;

  // send the request
  request.send();
};

var requestComplete = function() {
  if(this.status !== 200) {
    return;
  }
  // grab the response text
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  
  populateList(countries);
};

var populateList = function(countries) {
  var ul = document.getElementById("country-list");

  countries.forEach(function(country) {
    var li = document.createElement("li");
    li.innerText = country.name;
    ul.appendChild(li);
  });
};

var app = function(){
  var url = "https://restcountries.eu/rest/v2";

  var button = document.querySelector("button");
  button.onclick = function() {
  makeRequest(url, requestComplete);
  };
}

window.onload = app;