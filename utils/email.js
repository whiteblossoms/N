const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Jonas Schmedtmann <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // console.log(process.env.SENDGRID_USERNAME);
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: "apikey",
          pass: "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"
        }
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    return transporter;
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html)
      // html:
    };

    const result = await this.newTransport().sendMail(mailOptions);
    console.log(result)
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
