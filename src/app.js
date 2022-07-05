const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const findCordinate = require('./utils/forecast')
const weatherByCord1 = require('./utils/geocode')

const port = process.env.PORT || 3000 // takes heroku's enviroment port, if we run locally then chooses 3000s
const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates', '/views')
const partialsPaths = path.join(__dirname, '../templates/partials')

// setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths)

app.use(express.static(publicDirectoryPath)) // Searches a match in the public folder

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Itay Feiner'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page!',
        name: 'Itay Feiner',
        problem: 'Unable to connect'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Itay Feiner',
        profession: 'computer science'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    findCordinate(req.query.address, (error,{lat, lot} = {})  => {
        if(error){
            return res.send({error})
        }
        weatherByCord1(lat, lot, (error,data1) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location: req.query.address,
                country: data1.country,
                region: data1.region,
                temperture: data1.temp,
                forecast: data1.mood,
                humidity: data1.humidity
            })
        })
    }) 
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        errorMessage: 'Help article not found',
        number: '404',
        name: 'Itay Feiner'
    })
})

app.get('/*', (req,res) => {
    res.render('404',{
        errorMessage: 'Page not found',
        number: '404',
        name: 'Itay Feiner'
    })
})



app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})