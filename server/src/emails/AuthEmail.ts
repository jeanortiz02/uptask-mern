import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user : IEmail) => {
        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - Confirma tu cuenta',
            text: 'Uptask - Confirma tu cuenta', 
            html: `
            
                <p>Hola, ${user.name} haz creado tu cuenta en Uptask, ya casi esta todo listo, solo debes confirmar tu cuenta </p>
                    <p>Visita el siguiente enlace:</p>
                        <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                    <p>E ingresa el código: <b>${user.token}</b></p>
                    <p>Este token expira en 10 minutos</p>
                
            `
        })

        console.log('Mensaje enviado', info.messageId)
    }

    static sendPasswordResetToken = async (user : IEmail) => {
        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - Reestablece tu password',
            text: 'Uptask - Reestablece tu password', 
            html: `
            
                <p>Hola, ${user.name} has solicitado reestablecer tu passwrod.</p>
                    <p>Visita el siguiente enlace:</p>
                        <a href="${process.env.FRONTEND_URL}/auth/new-password">Confirmar cuenta</a>
                    <p>E ingresa el código: <b>${user.token}</b></p>
                    <p>Este token expira en 10 minutos</p>
                
            `
        })

        console.log('Mensaje enviado', info.messageId)
    }
}