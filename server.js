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

app.get('/privacy', (req, res) => {
  res.render('privacy.hbs', {
    company: 'The Beute Clinic',
    phone: '+44 (0) 1672 288943',
    mail: 'hsvbeute@gmail.com',
    address: 'Unit K, The Wagon Yard, London Road, Marlborough, SN8 1LH'
  });
});


app.get('/', (req, res) => {
  res.render('home.hbs',
    {
      //Head.hbs variables
      keywords: 'podiatry, podiatry Marlborough, podiatry clinic, foot care, podiatry Swindon, Beute, chiropodist, medi peri marlborough',
      metaDescription: 'Welcome to the Beute Clinic, podiatry service and foot care specialists based in Marlborough. Book and appointment with one of our excellent podiatrists or visit the website to check the treatments available (medi peri, diabetic foot assessment, biomechanics, verrucae treatments,...)',
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
      instagram_url: 'https://www.instagram.com/explore/locations/1690143194594857/hannah-beute-clinic/',
      // linkedin_url: 'https://www.linkedin.com/in/hannah-beute-356044151/',

      //Maps
      address: 'Unit K, The Wagon Yard, London Road, Marlborough, SN8 1LH',
      map_link: 'https://www.google.co.uk/maps/place/The+Beute+Clinic/@51.420501,-1.726128,15z/data=!4m2!3m1!1s0x0:0x7157a3cfd58b1f7b?sa=X&ved=0ahUKEwjmsJbLpOfaAhUKDMAKHRq0AMQQ_BIIfjAK',

      //Services variables
      cancellationPolicy1: 'The Beute Clinic operates a cancellation policy. Our policy is similar to many other medical clinics and we ask all patients kindly to adhere to it.',
      cancellationPolicy2: 'Should you wish to cancel or reschedule an appointment we simply ask you to give a minimum of 24 hours notice for our shorter 30 minute appointments and 48 hours notice for our longer appointments such as our biomechanical assessments, nail surgery appointments and home visits. If this minimum is not adhered to, we reserve the right to charge the full treatment cost of the appointment.',
      cancellationPolicy3: 'We are aware that from time to time individual circumstances dictate that an appointment will be missed or less than the 24 hours notice will be given. On such occasions we can be lenient but frequent missed appointments can be very disruptive to the smooth running of the clinic and can also be inconvenient to other patients that require an appointment slot',


      //Contact Variables
      businessPhone: '01672288943, 07707697396',

      //Services
      treatment1: 'Meet Your Podiatrist',
      desc1: 'When did you go to a podiatrist for the last time? Foot care is key for a happy life. The initial one-hour appointment offered by the Beute Clinic will assess problem areas in your feet and ankles and collect relevant medical history...',
      desc1a: '...to give you the highest quality service. During this first session your podiatrist will put together a plan of action, determining the length of time required for treatment, and arranging future appointments to fit your schedule.',

      treatment2: 'Repeat Visit',
      desc2: 'After the first appointment, we provide 30 to 60-minute treatments periodically. Do you suffer from calluses, verrucae, fungal infections or in-grown toe nails? Some foot problems require...',
      desc2a: '...several appointments to make sure that the treatment is effective. In the Beute Clinic we care about our patients and aim to provide them with the best service and care that our fully dedicated podiatrists can give.',

      treatment3: 'Pronto',
      desc3: 'Pronto is the treatment you need if you only have a limited amount of time. Within this 20 minute treatment, the podiatrist will take care of a single problem area for patients that have to hit and run...',
      desc3a: '...but still want the best treatment and the best products in foot care.',

      treatment4: 'Medi Pedi',
      desc4: 'A medical pedicure is the combining of podiatric care and beauty treatment.  A non-invasive treatment that focuses on the hygienic and aesthetic care of toenails and skin. The Medi-Pedi is performed...',
      desc4a: '...in a private medical setting and addresses unsightly and uncomfortable conditions such as athlete’s foot, corns, calluses, dry / cracked heels, fungus, ingrown / overgrown toenails, and nail discoloration.',

      treatment5: 'Ultimate Medi Pedi',
      desc5: 'The pinnacle of foot indulgence.  A standard Medi Pedi and so much more. In a private medical setting, unsightly and uncomfortable conditions such as athlete’s foot, corns, calluses, dry / cracked heels...',
      desc5a: '...fungus, ingrown / overgrown toenails, and nail discolouration, are assessed and treated. Then.  Your feet are pampered with a luxurious Soak, Scrub, and brushed with warm paraffin wax that sooths aching joints and improves circulation, while softening hard and rough skin.  Next.  Your feet are placed in heated boots to allow moisture to penetrate the dermal layers of your skin, after which the nails are coated with a polish of your choice. Finally. Your feet and legs are revitalised with a massage using a specially-formulated, handmade pedicure cream. So the indulgence can continue beyond your appointment, we’ll prepare for you a free goodie bag to take home.',

      treatment6: 'Manly Pedi',
      desc6: 'A restorative gentleman’s foot treatment combining the benefits of cosmetic nail contouring and buffing with the indulgence of a foot soak, scrub, and lower leg massage. A treat for the senses and...',
      desc6a: '...a healthy way to relax and discover the comfort of healthy well-cared feet.',

      treatment7: 'Diabetic Foot Assessment',
      desc7: 'In depth analysis of the feet to discover any loss of protective sensation and to measure blood flow to the feet using ultrasound. A full report of the assessment is provided...',
      desc7a: '...Diabetes treatment is a speciality of The Beute Clinic. Our podiatrists have years of experience working in the field and remain up to date with the latest research and practices.',
      treatment8: 'Nail Surgery',
      desc8: 'A one-hour appointment to remove part or all of a toenail. Phenol which is an acid is used to ensure the offending portion of nail does not grow back. None-phenolic surgery is also provided dependant of personal preferences...',
      desc8a: '...though the most suitable course of action will be suggested by your podiatrist.',

      treatment9: 'Verruca Treatment',
      desc9: 'As part of your treatment with The Beute Clinic, or as the result of ongoing conditions or outpatient procedures; you may require wound care. Feet can be very sensitive, and wounds...',
      desc9a: '...on your feet can often take more time to heal. It’s important that wounds are correctly monitored, treated, and dressed to ensure clean, healthy healing. If the problem area is associated with another medical issue or is the result of a medical procedure conducted elsewhere, we will ensure communication is made with relevant health practitioners to maximise the healing process.',

      treatment10: 'Biomechanical Assessment',
      desc10: 'An assessment of the way your lower limbs function, checking for irregularities and possible causes of pain in the foot, ankle, knee, and back. Most people carry muscular or...',
      desc10a: '...skeletal imbalances that affect the way you stand and move.  These can lead to pain and discomfort, as well as general issues with functionality throughout your body. We’ll identify problem areas and help devise a course of action, including advice on orthotics and made-to-measure insoles, as well as corrective exercises.',

      treatment11: 'Wound care',
      desc11: 'As part of your treatment with The Beute Clinic, or as the result of ongoing conditions or outside procedures, you may require wound care. Feet can be very sensitive, and wounds...',
      desc11a: '...on your feet can often take more time to heal due to the requirement of regular movement.  It’s important that wounds are correctly monitored, treated, and dressed to ensure clean, healthy healing. If the problem area is associated with another medical issue or is the result of a medical procedure conducted elsewhere, we will ensure communication is made with relevant health practitioners.',



    });


});

app.post('/send', (req, res) => {
  const output = `<p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    <li>Treatment: ${req.body.treatment}</li>
    <li>Subject: ${req.body.subject}</li>
    <li>Message: ${req.body.message}</li>
    <li>GDPR Consent: ${req.body.gdpr}</li>
    </ul>`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    port: 25, //587
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: process.env.MAIL_FROM, // sender address
    to: process.env.MAIL_TO, // list of receivers
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

    res.render('partials/thanks', { businessName: 'The Beute Clinic' });



  });

});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});







