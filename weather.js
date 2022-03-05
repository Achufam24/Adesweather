let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById('temp-value');
let climate = document.getElementById("climate");
let iconfile;
const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");
//click button to fetch api
searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
});
//usng async and await
const getWeather=async(city)=>{
    try{
        //fetch Api 
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d30ba4b738da5c238977c5fb04a35b0a`,
        {mode:'cors'}
        ); 
        //use Json to convert to js objects
        const weatherData= await response.json();
        console.log(weatherData);
        const{name}= weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);
        //weather Data images
        if (id<300 && id>300) {
            tempicon.src="./icons/storm.png " 
        }
        else if (id<400 && id>300) {
            tempicon.src="./icons/cloudy.png"
        }
        else if (id<600 && id>500)  {
            tempicon.src="./icons/rainy-day.png"
        }
        else if (id<700 && id>600) {
            tempicon.src="./icons/sun.png"
        }
        else if (id<800 && id>700) {
            tempicon.src="./icons/rain.png"
        }
        else if (id==800) {
            tempicon.src="./icons/weather.png"
        }
    }
    //error response
catch(error)
{
    alert('city not found');
}
}