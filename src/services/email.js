import path from "path";
import { readFile } from "fs";
import mailer from "nodemailer";

const { EMAIL, EMAIL_PASSWORD } = process.env;

const smtpTransport = mailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL, pass: EMAIL_PASSWORD }
});

const asyncMail = mail =>
  new Promise((resolve, reject) => {
    smtpTransport.sendMail(mail, (err, res) => {
      smtpTransport.close();
      if (err) reject(err);
      resolve();
    });
  });

const asyncReadFile = path =>
  new Promise((resolve, reject) =>
    readFile(path, "utf-8", (err, data) => (err ? reject(err) : resolve(data)))
  );

const getEmailTemplate = template =>
  new Promise(async (resolve, reject) => {
    const templatePath = path.resolve(`src/templates/emails/${template}.json`);
    try {
      const fileData = await asyncReadFile(templatePath);
      const jsonData = JSON.parse(fileData);
      resolve(jsonData);
    } catch (e) {
      reject(e);
    }
  });

const getHTMLTemplate = template =>
  new Promise(async (resolve, reject) => {
    const templatePath = path.resolve(`src/templates/emails/${template}.html`);
    try {
      const fileData = await asyncReadFile(templatePath);
      resolve(fileData);
    } catch (e) {
      reject(e);
    }
  });

const send = (hacker, template) =>
  new Promise(async (resolve, reject) => {
    const emailTemplate = await getEmailTemplate(template);
    const htmlTemplate = await getHTMLTemplate(template);

    const mail = {
      to: hacker.email,
      from: EMAIL,
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: htmlTemplate
    };

    try {
      await asyncMail(mail);
      resolve();
    } catch (e) {
      reject(e);
    }
  });

export default { send };
