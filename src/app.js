const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')
const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

const directory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)

app.use(express.static(directory))
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Eduard'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Eduard'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is my help page!',
    title: 'Help',
    name: 'Eduard'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      err: 'You must provide an address!'
    })
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        err
      })
    }

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        {
          err
        }
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })

  // res.render('weather', {
  //     title: 'Weather page',
  //     name: 'Eduard'
  // })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: 'no products'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: '404'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
