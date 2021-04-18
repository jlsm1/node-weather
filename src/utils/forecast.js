
//weather
// const targetURL ='http://api.weatherstack.com/current?access_key=25762fc46f15d6d94b80d4273bc72cbf&query=32.8267,-122.4233&units=f'

// request({url: targetURL, json: true}, (error, response) => {
//     if (error) {
//         console.log('Can\'t connect to weather service')
//     } else if (response.body.error) {
//         console.log('Weather service didn\'t like your request')
//     } else {
//         console.log(response.body.current.weather_descriptions[0])
//         console.log('Current temperature is', response.body.current.temperature)
//         console.log('It feels like', response.body.current.feelslike)
//     }
// })

const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=25762fc46f15d6d94b80d4273bc72cbf&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('There was a problem during the HTTP request for the weather service', undefined)
        } else if (body.error) {
            callback('The weather service returned an error', undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
            })
        }
    })
}

module.exports = forecast