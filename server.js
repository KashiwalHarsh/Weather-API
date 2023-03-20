const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const today = require(__dirname+"/date.js")
let alert = require('alert'); 



const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public/"));
app.set('view engine', 'ejs');
require("dotenv").config();

app.get("/",function(req,res){

    let time = today.getTime();
    let date = today.getDate();
    res.render("index",{weatherImg:"sunny",location:"Dholavira",tempNow:"12",description:"Clear Sky",Time:time,Date:date,feels:"13",humidity:"40%",wind:"5"});
})

app.post("/",function(req,res){
    
    const city = req.body.cityName;
    const apiKey = process.env.APIKEY;
    const units = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+units;

    async function go(){
        try{
            https.get(url,function(response){
                    response.on("data",function(data){
                        if(response.statusCode!=200){
                            console.log("Oh no")
                            alert("Correct spelling likh lawde")
                            res.redirect("/")
                        }else{

                            console.log(response.statusCode)
                            const city = req.body.cityName;
                            const weatherData = JSON.parse(data);
                            const temp = weatherData.main.temp;
                            const weatherDescription = weatherData.weather[0].description;
                            const weatherMain = weatherData.weather[0].main;
                            let time = today.getTime();
                            let date = today.getDate();
                            const feelsTemp = weatherData.main.feels_like;
                            const humid = weatherData.main.humidity;
                            const speedWind = weatherData.wind.speed;
                            
                            res.render("index",{weatherImg:weatherMain,location:city,tempNow:temp,description:weatherDescription,Time:time,Date:date,feels:feelsTemp,humidity:humid,wind:speedWind});
                        }
                })
            })
        }catch(err){
            console.log("oh no!!");
        } 
    }
    go();

})

const port = process.env.PORT;
app.listen(port || 3000,function(){
    console.log("server is running on 3000")
})
