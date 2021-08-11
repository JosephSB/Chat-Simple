const express = require('express')
const morgan = require('morgan')
const path = require('path')

const routes = require('./routes/router')
const publicDir = express.static(path.join(__dirname + '/public'))
const port = (process.env.PORT || 3000)

const app = express()

/*----------------------------SETTINGS----------------------------*/
app.set('port', port)

/*--------------------------MIDDLEWARES---------------------------*/
app.use(morgan('dev'))
app.use(publicDir)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use('/task',routes)

module.exports = app