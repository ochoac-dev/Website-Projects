class Weather {
    constructor(city , country){
        this.apiKey = '164de56048cc624bb6607eef2b107115';
        this.city = city;
        this.country = country;
    }

    //Fetch Weather from API
    async getWeather() {

        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&APPID=${this.apiKey}`);
        //const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.apiKey}`);
   
        const responseData = await response.json();

        return responseData.current_observation;
    }
    // Change Weather Location
    changeLocation(city, country){
        this.city = city;
        this.country = country;
    }
}


//const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&APPID=${this.apiKey}`);
//const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.api_key}`);