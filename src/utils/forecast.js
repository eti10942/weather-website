const request= require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=e9e93f6b9bcfeb26e0e1362b7fbc0b09&query='+ latitude +','+ longitude +'&units=f'
    request({url,json:true},(error,{body})=>{
          if(error){
             callback('Unable to connect to weather service',undefined)
           }else if(body.error){
             callback('Unable to find location. Try another search',undefined)
           }else{
             callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' temparture outside. It feels like '+body.current.feelslike
            )
          }
  
        })
}
module.exports=forecast   