//Openweathermap API key https://home.openweathermap.org/users/sign_up*/
const api = '484e93920f5d7a483f34143c7bcaea02'; 
let base;

//const city = ['Singapore', 'Seoul', 'Tokyo', 'San Francisco'];

/*for (let c of city) {
	requestApi(c);
}*/

//get the input field
inputField = document.getElementById("city")

inputField.addEventListener("keyup", e =>{
	
    if(e.key == "Enter" && inputField != ""){
        requestApi(inputField.value);
		inputField.value = ''; //clear input field
    }	
});

// API call with city ${c} and temperature in celsius units=metric
function requestApi(c){
	
    base = `https://api.openweathermap.org/data/2.5/weather?q=${c}&units=metric&appid=${api}`;
    fetchData();
};
	  
function getCurrentLocation() {

  let long;
  let lat;
  //let base;
  // Accesing Geolocation of User
  if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
	  
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
      fetchData();	   
	})
};
	
}

// Get the data and display in HTML
function fetchData(){

	  // Using fetch to get data     
	  fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
			const { temp, feels_like } = data.main;
			const place = data.name;
			const { main, description, icon } = data.weather[0];
			const { sunrise, sunset, country } = data.sys;

			const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
			
			document.getElementById("weather").textContent = ""; // clear readings
	 
			let tempC = document.createElement('h1');
			tempC.textContent = `${temp.toFixed(0)} °C`; //remove decimal

			let picture = document.createElement('img');
			picture.src = iconUrl;
			
			let desc = document.createElement('p');
			desc.textContent = description;
			
			// Add material-icons
			// https://stackoverflow.com/questions/45116794/material-design-lite-append-icon
			let i = document.createElement('i');
			i.className = 'material-icons';
			i.textContent = 'place';
			
			let cityName = document.createElement('span');
			cityName.textContent = `${place}, ${country}`;
			document.getElementById("weather").append(tempC, picture, desc, i, cityName);
		
        })
		.catch(() => {
			document.getElementById("msg").textContent = "Please search for a valid city";
		});
		document.getElementById("msg").textContent = ""; // clear msg
};
