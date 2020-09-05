const express=require('express')
const path=require('path')
const hbs=require('hbs')
const { isAbsolute } = require('path')
const app=express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

//Setup handlebars views and location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Etika'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Etika'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is some helpful text',
        title:'Help',
        name:'Etika'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            }) 
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Etika',
        errorMessage:'Help article not found'
    })


})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Etika',
        errorMessage:'Page not found'
    })

})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})