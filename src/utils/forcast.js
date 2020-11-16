const request = require('request');

const forcast = (coordinate, callback)=>{
    const weatherURL = 'http://api.weatherstack.com/current?access_key=cb8ff71169e4964ad4c0fc8c19c2c784'
                    +'&query='+coordinate.lat+','+coordinate.long
                    +'&units=f';
    request({ url :weatherURL , json : true} , (err, response)=>{
        if(err){
            callback('Unable to access wetaher service. Check your internet service');
        }
        else if(response.body.error){
            callback(response.body.error.type +"  :::  "+response.body.error.info)
        }
        else{
            var currentWeather = response.body.current;
            callback(undefined , 'Weather Status : '+currentWeather.weather_descriptions[0]
            +". It is currently "+ currentWeather.temperature+
            " degrees out. But feels like "+currentWeather.feelslike+" degrees out");
        }
    });
}

module.exports = {
    forcast : forcast
}
