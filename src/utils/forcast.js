const request = require('request');

const forcast = (lat, lang, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e89152a20f3cff4b275cf800063f870f&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lang) + '&units=f';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            //console.log('Unable to connect to weather service');
            callback('Unable to connect to weather service', undefined);
        } if (body.error) {
            //console.log('Unable to find location');
            callback('Unable to find location', undefined);
        } else {
            // console.log(body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out");
            callback(undefined, {
                weather_descriptions: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
            });
        }
    });

}
module.exports = forcast;
