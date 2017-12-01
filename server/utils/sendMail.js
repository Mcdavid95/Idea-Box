import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @function sendUrgentMail
 * @param {*} token
 * @param {*} email
 * @param {*} host
 * @returns {*} Email notification
 */
export const resetPassword = (token, email, host) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: '"PostIt" <mcdavidemereuwa95@gmail.com>',
    to: email,
    subject: 'Idea-Box PASSWORD RESET',
    html: `
    <div style="width: 100%; color: white; background-color: #fff; padding: 2%;">
    <div style="width: 60%; background-color: #2c3e56; margin: auto;">
      <div style="height: 8%; background-color: #2c3e56; width:100%; border-bottom: 1.2px solid black">
        <p style="color: palevioletred; font-weight:bold; margin-left: 3%; padding-top: 2%; font-family: kurale serif">POSTIT!!</p>
      </div>
      <div style="padding: 8%">
        <div class="row">
          You are receiving this because you (or someone else) 
    have requested the reset of the password for your account.
    Please click on the following link or paste this into your browser 
    to complete the process
        </div>
        <div>
          <br>
          <a href="http://${host}/reset/${token}"><button style="background-color: teal; color: white; border-color: teal">Reset Password</button></a>
        </div>
        <p style="font-weight: bold; font-family:kurale serif; color: palevioletred">POSTIT!!</p>
      </div>
      <div style="height: 8%; background-color: #2c3e56; width:100%; border-top: 1.2px solid black">
      <p><small style="padding-left: 2%; text-align: center; color:white;"> Copyright m.jeck</small></p>
     </div>
    </div>
  </div>
    `
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      return error;
    }
  });
};
/**
 * @function sendSuccessfulReset
 * @param {*} email
 * @returns {*} Email notification
 */
export const sendSuccessfulReset = (email) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"PostIt" <mcdavidemereuwa95@gmail.com>',
    to: email,
    subject: 'Idea-Box PASSWORD CHANGE SUCCESSFUL',
    html: `  <div style="width: 100%; color: white; background-color: #fff; padding: 2%;">
    <div style="width: 60%; background-color: #2c3e56; margin: auto;">
      <div style="height: 8%; background-color: #2c3e56; width:100%; border-bottom: 1.2px solid black">
        <p style="color: palevioletred; font-weight:bold; margin-left: 3%; padding-top: 2%; font-family: kurale serif">POSTIT!!</p>
      </div>
      <div style="padding: 8%">
        <div class="row">
          This email confirms that your new POSTIT password has been updated.
    You can now access your Account.
        </div>
          <br>
          Thanks You.
        <div>
          <br>
        </div>
        <p style="font-weight: bold; font-family:kurale serif; color: palevioletred">POSTIT!!</p>
      </div>
      <div style="height: 8%; background-color: #2c3e56; border-top: 1.2px solid black; width:100%">
        <p><small style="padding-left: 2%; text-align: center; color:white;"> Copyright M.jeck</small></p>
      </div>
    </div>
  </div> `
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    console.log(`Message ${info.messageId} send: ${info.response}`);
  });
};
