const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const config = functions.config();
const cors = require("cors")({origin:true});
admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {user: config.user.email, pass: config.user.password},
});


let mailOptions = {};

exports.sendMailFromTow= functions.https.onRequest((request, response)=>{
  cors(request, response, ()=>{
    const{phone, message} = request.query

    mailOptions = {//то что получим себе от того почт ящика
      from: 'TowTruck18',
      to: 'andreynef@gmail.com, navigator2@bk.ru',
      subject: 'Принято сообщение',
      html: `
              <p style='font-size:16px'> Тел: ${phone} </p>
              <p style='font-size:16px'> Сообщение: ${message} </p>
            `,
    };

    transporter.sendMail(mailOptions, error=> {
      if(error){
        response.send(error);
      } else {
        response.send('Сообщение отправлено');
      }
    });
  });
});

