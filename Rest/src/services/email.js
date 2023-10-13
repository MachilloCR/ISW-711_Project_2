// const { google } = require("googleapis");
const nodemailer = require("nodemailer");
// const credentials = require("./../utils/credentials.json");
// const tokens = require("./tokens.json");

// const getGmailService = () => {
//   const { client_secret, client_id, redirect_uris } = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//     client_id,
//     client_secret,
//     redirect_uris[0]
//   );
//   oAuth2Client.setCredentials(tokens);
//   const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
//   return gmail;
// };

// const encodeMessage = (message) => {
//   return Buffer.from(message)
//     .toString("base64")
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
// };

// const createMail = async (options) => {
//   const mailComposer = new MailComposer(options);
//   const message = await mailComposer.compile().build();
//   return encodeMessage(message);
// };

// const sendMail = async (options) => {
//   const gmail = getGmailService();
//   const rawMessage = await createMail(options);
//   const { data: { id } = {} } = await gmail.users.messages.send({
//     userId: "me",
//     resource: {
//       raw: rawMessage,
//     },
//   });
//   return id;
// };

// module.exports = sendMail;

const transporter = nodemailer.createTransport({
  service: "gmail",
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false,
  auth: {
    user: "soursystemutn@gmail.com",
    pass: "nmxzfevpgcvhobbo",
  },
});

const sendEmail = async (mailDetails, callback) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    callback(info);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
