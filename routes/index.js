const fs = require('fs')
const express = require('express');
const passport = require('passport')
const request = require('request')
const {use} = require("express/lib/router");
const {response} = require("express");
const pgdb = require('../databases/pgdb')
const multer = require('multer')

const router = express.Router();
const upload = multer({dest: 'public/files/uploads'})
const apiKey = '1fb720b97cc13e580c2c35e1138f90f8'
//const apiKey = '123456789'
const apiBaseUrl = 'http://api.themoviedb.org/3';
//const apiBaseUrl = 'http://localhost:3030'
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req,res,next) => {
    res.locals.imageBaseUrl = imageBaseUrl
    next()
})

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl,(error,response,moveData) => {
     const parseData = JSON.parse(moveData)
    res.render('index', {
       parsedData: parseData.results
    });
  })
});

router.get('/login',passport.authenticate('github'))

router.get('/auth',passport.authenticate('github',{
    successRedirect: '/',
    failureRedirect: 'loginFailed'
}))

router.get('/favorites',(req,res) =>{
    res.json(req.user.displayName)
})


router.get('/movie/:id',(req, res, next)=>{
    // res.json(req.params.id);
    const movieId = req.params.id;
    const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`
    // res.send(thisMovieUrl)
    request.get(thisMovieUrl,(error, response, movieData)=>{
        console.log(typeof(movieData))
        const parsedData = JSON.parse(movieData)
        res.render('single-movie',{
            parsedData
        })
    })
})

router.get('/upload',(req,res) => {
    res.render('upload',{})
})

router.post('/formsub',upload.single('meme'),(req,res) => {
    const newPath = `public/files/uploads/${req.file.originalname}`
    fs.rename(req.file.path, newPath, () => {
        res.json({msg: 'file upload'})
    })
})

router.post('/search',(req,res,next) => {
    const userSearchTerm = encodeURI(req.body.movieSearch)
    const cat = req.body.cat
    const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`
    request.get(movieUrl,(error,response, movieData) => {
        let parsedData = JSON.parse(movieData)

        if(cat === 'person'){
            parsedData.results = parsedData.results[0].known_for
        }

        res.render('index',{
            parsedData: parsedData.results
        })
    })
})


module.exports = router;
