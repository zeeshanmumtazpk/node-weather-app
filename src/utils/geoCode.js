const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiemVzaGFubXVtdGF6MTEyMiIsImEiOiJja283MW1sczAwc2RxMnFxdzljaGJ5dHkyIn0.fOkvBUnLK0rmK4MNyBcB4w&limit=1';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            // console.log('Unable to connect to map box service');
            callback('Unable to connect to map box service', undefined)
        } if (body.features.lenght == 0) {
            //  console.log('Unable to find location');
            callback('Unable to find location. Try another one', undefined)
        } else {
            const lat = body.features[0]?.center[1] ? body.features[0].center[1] : null;
            const lang = body.features[0]?.center[0] ? body.features[0].center[0] : null;
            const location = body.features[0]?.place_name ? body.features[0].place_name : null;

            // console.log(lat, lang);
            callback(undefined, {
                lat: lat,
                lang: lang,
                location: location
            });
        }

    });
}
module.exports = geoCode;