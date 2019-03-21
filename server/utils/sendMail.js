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
    <body><div>
    <div style="background-color:#f2f3f5;padding:20px">
      <div style="max-width:600px;margin:0 auto">
       <div 
        style="
          background:#fff;
          font:14px sans-serif;
          color:#686f7a;
          border:2px solid #f4ab40;
          margin-bottom:10px">
        <div 
          style="
           border-bottom:1px solid #f2f3f5;
           padding-bottom:20px;
           padding-top:20px">
          <h4 
            style="
              padding-top:0; 
              padding-left:20px; 
              margin:0; 
              font-size:30px;
              font-family:'Kurale', serif;">
              IdeaBox</h4>
        </div>
        <div style="padding:10px 20px;line-height:1.5em;color:#686f7a">
          <p 
            style="
              padding-bottom:20px;
              margin:20px 0;
              color:#686f7a">
             You have requested to reset your password for IdeaBox account. Please click on the button below to reset your password.
          </p>
      <p
         style=""><a href="http://${host}/reset/${token}" 
            style="
              display:inline-block;
              font-size:15px;color:#ffffff;
              padding:10px 15px;
              text-decoration:none;
              background-color:#f4ab40;
              border-radius:3px" 
              target="_blank">
              Reset Password
          </a>
          </p>
          <p 
            style="
              padding-bottom:15px;
              margin-top:40px;
              color:#686f7a">
              If you haven't made this request please ignore this message.
          </p>
          <p 
            style="padding-bottom:10px;
              margin-top:20px;
              color:#686f7a">
              Best regards, <br>
              IdeaBox Team.<br>
            <a href="https://ideapack.herokuapp.com"
              style="color: #f4ab40">https://ideahack.herokuapp.com
            </a>
          </p>
        </div>
     </div>
    </div>
  </body>
    `
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      return error;
    }
  });
};
export default resetPassword;
