const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const nodemailer = require("nodemailer");

const UserModel = require("../Models/user");
const SessionModel = require("../Models/session");
const OTPModel = require("../Models/otp");
const { default: mongoose } = require("mongoose");
const sendEmail = require("../services/email");
//Twilio

const accountSid = "AC25d20b0df8f78e84bf5bdafe43ebf754";
const authToken = "20ed2a44cd701d494fa0988c421a68cd";
const client = require("twilio")(accountSid, authToken);

//Generar Code
function generarCodigoUnicoCorto(longitud) {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    code += caracteres.charAt(indice);
  }
  return code;
}


//send the emails
function SendSMS(phone, code) {
  client.messages
    .create({
      body: "This is code authentication " + code,
      from: "+1 507 682 7268",
      to: "+506" + phone,
    })
    .then((message) => console.log(message.sid));
}
// 2FA
const addNewOTP = (otp, expirationTime, username, status) => {
  const newOTP = new OTPModel.model();
  newOTP.otp = otp;
  newOTP.username = username;
  newOTP.expireIn = addMinutesToDate(new Date(), expirationTime);
  newOTP.status = status;
  return newOTP.save();
};

const addMinutesToDate = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

//login
router.post("/session", async (req, res) => {
  const { email, password } = req.body;

  //searches for a user that has the specified email and password.
  const user = await UserModel.model.findOne({
    email: email,
    password: password,
  });

  if (!user || !password) {
    res.status(400).json({ message: "Invalid credentials" });
  } else {

    const code = generarCodigoUnicoCorto(6); // se genera un código único
    addNewOTP(code, 15, user.email, "PENDING");
    SendSMS(user.phone, code);
    res.status(201).json({ msg: "User Confirmed", status: 1 });
  }
});

router.post("/session/sms", async (req, res) => {
  const { code } = req.body;

  try {
    const verifyCode = await OTPModel.model.findOne({ otp: code });
    console.log(verifyCode);
    const user = await UserModel.model.findOne({
      email: verifyCode.username
    });
    if (verifyCode) {
      //create a new session
      const session = new SessionModel.model();

      const token = jwt.sign(
        { id: user._id, rol: user.role_id },
        process.env.MYSECRET
      );

      session.token = token;

      let id = user._id;
      //verify is this token already exist

      session.save(function (err) {
        if (err) {
          res.status(422);
          console.log("error while saving the session", err);
          res.json({
            error: "There was an error saving the session",
          });
        }
        //Session Created Succefully
        res.status(201).json({ token, id });
      });

      //Delete OTP Code
      OTPModel.model.findOne({ otp: code }, function (err, otpcode) {
        if (err) {
          console.log('Error 1', err);
        }
        otpcode.delete(function (err) {
          if (err) {
            console.log('Error 1', err);
          }
        });
      });

    }
  } catch (error) {
    res.status(401).json({ msg: "User not Authorized" });
  }
});


//Session with passwordless

router.post("/passwordless", async (req, res) => {

  try {
    const { email } = req.body;
    const user = await UserModel.model.findOne({
      email: email,
    });

    const session = new SessionModel.model();
    const token = jwt.sign(
      { id: user._id, rol: user.role_id },
      process.env.MYSECRET
    );
    session.token = token;
    let id = user._id;
    //verify is this token already exist
    session.save(function (err) {
      if (err) {
        res.status(422);
        console.log("error while saving the session", err);
        res.json({
          error: "There was an error saving the session",
        });
      }
      const options = {
        from: "soursystemutn@gmail.com",
        to: email,
        subject: "PasswordLess Login",
        text: `Here you go! Please here is your access link: http://localhost:3000/home?tok=${token}&use=${id}`,

      };

      sendEmail(options, (info) => {
        console.log("Email sent successfully");
        console.log("MESSAGE ID: ", info.messageId);
      });
      //Session Created Succefully
      res.status(201).json({ msg: "Email sent successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(401).json("error");
  }
});



module.exports = router;
