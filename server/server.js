const path = require('path');
const express = require('express');
const bodyParse = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');

const publicPath = path.join(__dirname, '../public/thebeuteclinic');
const port = process.env.PORT || 3000;
var app = express();

//VIEW ENGINE SETUP

/*app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');*/

//BODY PARSER MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//static folder
/*app.use('/public', express.static(path.join(__dirname, 'public')));*/

//ROUTES

//app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

