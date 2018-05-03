const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbs = require('hbs');
const nodemailer = require('nodemailer');
require('dotenv/config');

var app = express();

const port = process.env.PORT || 3000;

//VIEW ENGINE SETUP
hbs.registerPartials(__dirname + '/views/partials');
//app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

//STATIC FOLDER

app.use('/public', express.static(path.join(__dirname + '/public')));

//BODY PARSER MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('home.hbs',
    {
      //Head.hbs variables
      keywords: 'podiatry, podiatry Marlborough, podiatry clinic, foot care, podiatry Swindon, Beute',
      metaDescription: 'Welcome to the Beute Clinic, podiatry service and foot care specialists based in Marlborough',
      pageTitle: 'The Beute Clinic',

      //Header.hbs variables
      logo: 'public/img/logohannah.png',
      logoCaption: 'Beute Clinic logo',
      logoTitle: 'Welcome to the Beute Clinic',
      // menu1: '',
      // menu2: '',
      // menu3: '',
      // menu4: '',
      // menu5: '',
      //Hero variables
      h1Title: 'Welcome to The Beute Clinic',

      webmail: 'hsvbeute@gmail.com',
      twitter_url: '',
      facebook_url: 'https://www.facebook.com/thebeuteclinic/',
      googleplus_url: '',
      linkedin_url: 'https://www.linkedin.com/in/hannah-beute-356044151/',

      //Maps
      address: 'Unit K, The Wagon Yard, London Road, Marlborough SN8 1LH',
      map_link: 'https://www.google.co.uk/maps/place/The+Beute+Clinic/@51.420501,-1.726128,15z/data=!4m2!3m1!1s0x0:0x7157a3cfd58b1f7b?sa=X&ved=0ahUKEwjmsJbLpOfaAhUKDMAKHRq0AMQQ_BIIfjAK',

      //Services variables
      cancellationPolicy1: 'The Beute Clinic operates a cancellation policy. Our policy is similar to many other medical clinics and we ask all patients kindly to adhere to it.',
      cancellationPolicy2: 'Should you wish to cancel or reschedule an appointment we simply ask you to give a minimum of 24 hours notice for our shorter 30 minute appointments and 48 hours notice for our longer appointments such as our biomechanical assessments, nail surgery appointments and home visits. If this minimum is not adhered to, we reserve the right to charge the full treatment cost of the appointment.',
      cancellationPolicy3: 'We are aware that from time to time individual circumstances dictate that an appointment will be missed or less than the 24 hours notice will be given. On such occasions we can be lenient but frequent missed appointments can be very disruptive to the smooth running of the clinic and can also be inconvenient to other patients that require an appointment slot'






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
    host: 'smtp.google.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ricard.ribatallada@gmail.com', // generated ethereal user
      pass: 'carmineisserenade' // generated ethereal password
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

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.render('home', { msg: 'Email has been sent' });

  });

});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});





