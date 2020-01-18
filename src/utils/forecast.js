const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/adad7bf78bbeb4e2bd9f3f16e8f00197/' + latitude + ',' + longitude + '?units=si&lang=ru';
    request( {url, json: true}, (error, { body} ) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        }else if (body.error){
            callback('Unable to find the location', undefined);
        }else{
            callback(undefined, body.daily.data[0].summary + 
                ' It is currently ' + body.currently.temperature + 
                ' degrees out. ' + 
                'Low today is ' + body.daily.data[0].temperatureLow + '. ' +
                'High today is ' + body.daily.data[0].temperatureHigh + '.' +
                'There is a ' + body.currently.precipProbability + 
                '% chance of rain. '
                );

        }
    });
}

module.exports = forecast;