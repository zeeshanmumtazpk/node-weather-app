const path = require('path');

const express = require('express');
const hbs = require('hbs');

const forcast = require('./utils/forcast');
const geoCode = require('./utils/geoCode');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Zeshan'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Contact us : 0334-6876765',
        name: 'Zeshan'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Zeshan'
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Adress is required.' });
    }
    geoCode(req.query.address, (error, { lat, lang, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forcast(lat, lang, (forcastError, forcastData) => {
            if (forcastError) {
                return res.send({ error: forcastError });
            }
            res.send({
                forcastData: forcastData,
                location,
                address: req.query.address
            });
        });
    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zeshan',
        error: 'Help article not found'
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zeshan',
        error: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('server is running on port 3000')
});