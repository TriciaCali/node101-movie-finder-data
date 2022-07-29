const express = require('express');
 const morgan = require('morgan');
const bodyParser= require('body-parser');
require('dotenv').config();
let keto = process.env.API_KEY;
const Axios = require('axios'); 



//create express server
const app = express();

const movieData = [];
console.log("yes")
//middleware
 app.use(morgan('dev'));
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
 
 app.get("/",(req,res)=>{
     
    let searchItem = Object.values(req.query)[0];
    let result = movieData.filter(
        (found)=> found.Title.toLowerCase()== searchItem || found.imdbID == searchItem
    );
    
      
    if (result.length === 1)res.status(200).json(result[0]);
    else{
        
         const path = req.url;
        
       Axios.get(`http://www.omdbapi.com${req.url}&apikey=${process.env.API_KEY}`).then(
            (movie)=>{
               
                movieData.push(movie.data);
                res.status(200).json(movie.data);
                //console.log(movieData)
           }
        )
    .catch(function (error){
        res.status(200)
    })
    }  
});
 
// export express application at the end
module.exports = app;