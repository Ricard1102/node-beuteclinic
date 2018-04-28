const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
require('dotenv/config');

var app = express();

const port = process.env.PORT || 3000;

//VIEW ENGINE SETUP

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//STATIC FOLDER

app.use('/public', express.static(path.join(__dirname + '/public')));

//BODY PARSER MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('contact',
    {
      webmail: 'hsvbeute@gmail.com',
      twitter_url: '',
      facebook_url: 'https://www.facebook.com/thebeuteclinic/',
      googleplus_url: '',
      linkedin_url: 'https://www.linkedin.com/in/hannah-beute-356044151/',
    });

});

app.post('/send', (req, res) => {
  const output = `<p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    <li>Subject: ${req.body.subject}</li>
    <li>Message: ${req.body.message}</li>
    </ul>`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    //host: 'smtp.google.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ricard.ribatallada@gmail.com', // generated ethereal user
      pass: carmineisserenade // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Ricard Ribatallada" <ricard.ribatallada@gmail.com>', // sender address
    to: 'ricard.ribatallada@gmail.com', // list of receivers
    subject: 'Contact request', // Subject line
    text: 'Hello world', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.render('contact', { msg: 'Email has been sent' });

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });

});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});





