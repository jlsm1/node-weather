const path = require(`path`)
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

//PAths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views locationa
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory 
app.use(express.static(publicDirectoryPath))

//return a view with res.render using the template name
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Web App',
        name: 'Someone'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Someone'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Someone',
        help_message: 'This is the help message',
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            console.log(error)
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                console.log(error)
                return res.send({error})
            }
    
            console.log(location)
            console.log(forecastData)

            res.send({
                address: req.query.address,
                location: location,
                lat: latitude,
                lon: longitude,
                forecast: forecastData
            })
        })
    })

})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help article not found',
        error_message: 'Sorry, we couldn\'t find this help article',
    })})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Page not found',
        error_message: 'Sorry, we couldn\'t find this page',
    })
})

app.listen(3000, () => {
    console.log('Server up on port 3000.')
})