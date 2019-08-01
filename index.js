'use strict'
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(path.join(__dirname + '/public')))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .set('view engine', 'ejs')
  .set('views', 'views')
  .get('/', (req, res) => { res.render('login') })
  .get('/home', (req, res) => { res.render('index') })

// require all routers of your application
const routers = require('./routers/app_routers');
routers(app);


// set port server 
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })
