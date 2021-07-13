
/* Global Variables */
const API_KEY = "22d5faca3063061017d034c09875208a&units=metric";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const zipCodeInput = document.getElementById('zip');
const feelingInput = document.getElementById('feelings');
const generateBtn = document.getElementById('generate');
const zipCodeError = document.getElementById('zip_error');
let zipCode = '';
let feelings = '';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();





  // Assign Input Field Values 
generateBtn.addEventListener('click', () => {
    zipCode = zipCodeInput.value;
    feelings = feelingInput.value;

    if(zipCode) {

        zipCodeError.innerHTML = "";

        getWeather(zipCode)
        .then((data) => {
            //console.log(data);

            if(data.cod === 200){

                postData('/addWeatherData', {temp: data.main.temp, date: newDate, content: feelings});

            }
           
        })
        .then(() => {
            updateUI();
        });
    
    } else {

        zipCodeError.innerHTML = "Please enter a valid Zip Code";

    }
    
});


// POST Data Function
const postData = async ( url = '', data = {})=>{
    //console.log(url);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
  
      try {
        const newData = await response.json();
        //console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
  
  // GET Weather Function
const getWeather = async ( zipCode )=>{
        const response = await fetch(BASE_URL + zipCode + ',us' + '&appid=' + API_KEY)
    
        try {
          const newData = await response.json();
          //console.log(newData);
  
          if(newData.cod !== 200) {
              zipCodeError.innerHTML = newData.message;
          }
  
          return newData;
  
        }catch(error) {
            zipCodeError.innerHTML = error.message;
        }
    }


const updateUI = async () => {
    const response = await fetch('/all');

    const data = await response.json();
    document.getElementById('temp').innerHTML = data.temp;
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('content').innerHTML = data.content;

    try {

    } catch(error) {
        console.log('Error', error);
    }
}