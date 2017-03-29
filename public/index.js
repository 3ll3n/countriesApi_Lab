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
  
  // populateList(countries);

  populateSelector(countries); 
};

var countryRequestComplete = function(){
  if(this.status !== 200) {
    return;
  }
  // grab the response text
  var jsonString = this.responseText;
  var country = JSON.parse(jsonString);

  populateCountryResult(country[0]);
};

var populateList = function(countries) {
  var ul = document.getElementById("country-list");

  countries.forEach(function(country) {
    var li = document.createElement("li");
    li.innerText = country.name;
    ul.appendChild(li);
  });
};

var populateSelector = function(countries) {
  var dropDown = document.getElementById("select-country")

  countries.forEach(function(country) {
    var option = document.createElement("option");
    option.innerText = country.name; 
    dropDown.appendChild(option);
  });
};

var populateCountryResult = function(country) {
  console.log(country);
      var pTag = document.querySelector("#country-result");
      pTag.innerText = "Country name: " + country.name + "\n Capital city: " + country.capital + "\n Population: " + country.population;
};

var handleSelectChanged = function() {
  var selectedCountry = this.value;
  var countryUrl = "https://restcountries.eu/rest/v2/name/" + selectedCountry;
  console.log(selectedCountry);

  makeRequest(countryUrl, countryRequestComplete);
};

var app = function(){
  var url = "https://restcountries.eu/rest/v2";
    makeRequest(url, requestComplete);

    var select = document.querySelector("select");
    select.onchange = handleSelectChanged;
};

window.onload = app;