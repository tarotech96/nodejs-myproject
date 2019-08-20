'use strict'
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// make sure app.use(cors()) always run before app set router
app.use(cors({
  origin: '*',
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  allowedHeaders: 'X-Requested-With,content-type',
  credentials: true
}));

app.use(express.static(path.join(__dirname + '/public')))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .set('view engine', 'ejs')
  .set('views', 'views')
  .get('/login', (req, res) => { res.render('login') })
  .get('/home', (req, res) => { res.render('index') })

// require all routers of your application
const routers = require('./routers/app_routers');
routers(app);


//// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // All Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// set port server 
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })
