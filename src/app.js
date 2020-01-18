const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

const app = express();

// define path for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicDirPath = path.join(__dirname, '../public');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

// app.com
// app.com/help
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Leo V'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Leo V'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Node course help',
        title: 'Help',
        name: 'Leo V'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error){
            console.log(error);
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                console.log(error);
                return res.send({ error })
            }
            console.log(forecastData);
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });            
          });    
    });

});

app.get('/products', (req, res) => {    
    if (!req.query.search){
        return res.send({ 
            error: 'You must provide search term'
        });
    }
    console.log(req.query.rating);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Leo V'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Leo V'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});