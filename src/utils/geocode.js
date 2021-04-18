const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamxzZXJyYW5vIiwiYSI6ImNramZqNjZhMDJ1cXYyd3J1djdnYXR0M20ifQ.WywGteq1B-zunOdv4L6M4A&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('There was a problem during the HTTP request', undefined)
        } else if (body.features.length === 0) {
            callback('Can\'t find' + address + '. Please try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode