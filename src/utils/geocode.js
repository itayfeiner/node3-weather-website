const request = require('request')

const weatherByCord1 = (lat, lot, callback) => {
    const url1 = 'http://api.weatherstack.com/current?access_key=be6f4395ea6e404b0a9ffe1d43fc52d1&query=' + lat +','+ lot + ''
    //console.log(url1)
    request({url: url1, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to service', undefined)
        } else {
            //console.log(response.body.current.weather_icons[0])
            callback(undefined, {
                country: response.body.location.country,
                region: response.body.location.region,
                temp: response.body.current.temperature,
                mood: response.body.current.weather_descriptions[0],
                humidity: response.body.current.humidity
            })
        }
    })
}

module.exports = weatherByCord1