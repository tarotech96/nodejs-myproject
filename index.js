const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.join(__dirname + '/public')))
    .set('view engine', 'ejs')
    .set('views', 'views')
    .get('/', (req, res) => { res.render('index') })
    .listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })