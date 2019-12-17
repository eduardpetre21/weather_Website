const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/05bf71c437123114d036f6fbea4f881b/' +
    latitude +
    ',' +
    longitude +
    '?' +
    'units=si'

  request(
    {
      url,
      json: true
    },
    (err, { body }) => {
      if (err) {
        callback('Unable to connect to weather service!', undefined)
      } else if (body.err) {
        callback('Unable to find location', undefined)
      } else {
        callback(
          undefined,
          body.daily.data[0].summary +
            ' It is currently ' +
            body.currently.temperature +
            ' degress out. There is a ' +
            body.currently.precipProbability +
            '% chance of rain.'
        )
      }
    }
  )
}

module.exports = forecast
