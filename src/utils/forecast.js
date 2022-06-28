const request = require('request')

const findCordinate = (place, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+place+".json?access_token=pk.eyJ1IjoiaXRheWZlaW5lciIsImEiOiJjbDNpdGtkcTYwd2NtM2Zxd3VlZzV2cGt4In0.F5ck7lfVimvAlCf5z-I-Lg"
    request({url, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to service', undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                lot: response.body.features[0].center[0]
            })
        }
    })
}

module.exports = findCordinate