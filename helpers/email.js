import nodemailer from 'nodemailer';

export const emailRegister = async (data) => {
    const { email, name, token } = data;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Información del email
    const info = await transport.sendMail({
        from:'"Itech - eCommerce" <cuentas@itech.com>',
        to: email,
        subject: "Itech - Confirma tu cuenta",
        text:"Confirma tu cuenta en Itech",
        html: `<p>Hola: ${name} Confirma tu cuenta en Itech.</p>
        <p>Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmed/${token}">Confirmar Cuenta</a></p>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>`
    })
}

export const emailForgetPassword = async (data) => {
    const { email, name, token } = data;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Información del email
    const info = await transport.sendMail({
        from:'"Itech - eCommerce" <cuentas@itech.com>',
        to: email,
        subject: "Itech - Restablece tu contraseña",
        text:"Restablece tu contraseña en Itech",
        html: `<p>Hola: ${name} has solicitado restablecer tu contraseña.</p>
        <p>Sigue el siguiente enlace para generar una nueva contraseña:
        <a href="${process.env.FRONTEND_URL}/forget-password/${token}">Restablecer Contraseña</a></p>
        <p>Si tu no solicitaste restablecer tu contraseña, puedes ignorar este mensaje.</p>`
    })
}