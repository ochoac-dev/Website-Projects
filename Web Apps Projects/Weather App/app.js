// Init storage
const storage = new Storage();
// Get Stored location data
const weatherLocation = storage.getLocationData();
 
// Init weather object
const weather = new Weather(weatherLocation.city, weatherLocation.country);
// Init UI
const ui = new UI();
 
// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);
//Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
 
    // Change location
    // Set Location in Local Storage
    storage.setLocationData(city, country)
 
    weather.changeLocation(city, country);
 
    // Get and display weather
    getWeather();
 
    // Close modal = we need to use jquery
    $('#locModal').modal('hide');
});
 
function getWeather() {
    weather.getWeather()
 
        // will return promise because 'async'
        .then(results => {
            ui.paint(results);
        })
        .catch(err => console.log(err))
}