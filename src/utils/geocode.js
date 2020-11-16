const request = require('request');

const geocode = (address, callback)=>{
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json'
                +'?types=country'
                +'&access_token=pk.eyJ1IjoibWljaWduZWVsIiwiYSI6ImNraGJldTc3MTAwZmgycG4xdXhycWhlNzEifQ.JKapWopmJUo9HwAKkdP9XQ'
                +'&limit=1';

    request({url : geoURL , json : true }, (err, response)=>{
        if(err){
            callback('Unable to access location service. Check your internet service ');
        }
        else if((response.body.features!=null && response.body.features.length == 0) ||response.body.message){
             if(response.body.message)
                callback(response.body.message);
            else
                callback("Empty Feature. Unable to get location detail for given location json");
        }
        else{
            const coordinate = {
                lat : response.body.features[0].center[1],
                long : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            }
            callback(undefined, coordinate);
        }
    });
}

module.exports = {
    geocode : geocode
} 