const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    }
})


// send mail with defined transport object
// Definir la estructura del correo electrónico
module.exports.sendMailToUser = async(userMail,token)=>{
    // CUERPO DEL MAIL
    console.log(token);
    let info = await transporter.sendMail({
    // DE
    from: 'admin@esfot.com',
    // PARA
    to: userMail,
    // ASUNTO
    subject: "Verifica tu cuenta de correo electrónico",
    // CUERPO DEL MAIL
    html: `<a href="http://localhost:3000/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
    });
    // VERIFICADOR EN CONSOLA
    console.log("Message sent: %s", info.messageId);
}