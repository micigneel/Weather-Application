const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geoUtil = require('../src/utils/geocode')
const foreCastUtil = require('../src/utils/forcast')

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname , '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve 
app.use(express.static(publicDirPath));


app.get('', (req, res)=>{
    res.render('index' ,{
        title : 'Weather Detect',
        creator : 'Cams'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'About Us',
        info : 'This is a weather app',
        creator : 'Cams'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Contact Us',
        contact : 'Phone : 7755645321',
        message : 'Email : a@gmail.com',
        creator : 'Cams'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            errorMess : "Address must be provided"
        });
    }
    geoUtil.geocode( req.query.address , (err, data)=>{
        if(err)
            return res.send({
                errorMess : err
            });
        
        foreCastUtil.forcast({ lat : data.lat , long : data.long }, (foreCasterr, ForcastData)=>{
            if(foreCasterr)
                return res.send({
                        errorMess : foreCasterr
                });
            
            res.send({
                forcast : ForcastData,
                location : data.location,
                address : req.query.address
            })
        });
       
    });
});


app.get('*', (req, res)=>{
    res.render('404Page', {
        creator : 'Cams'
    });
});

app.listen(3000, ()=>{
    console.log('Server is hosted with port:::3000');
});