import type { Request, Response } from 'express';
import User from '../models/User';
import { checkPassword, hashPassword } from '../utils/auth';
import Token from '../models/Token';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';

export class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;

            // Revisar si el usuario esta registrado
            const userExist = await User.findOne({email});
            if(userExist) {
                const error = new Error('El usuario ya esta registrado')
                return res.status(409).json({ error: error.message});
            }
            
            // Crea un usuario
            const user = new User(req.body)

            // Hash password 
            user.password = await hashPassword(password);
            
            // Generar token 
            const token = new Token();
            token.token = generateToken()
            token.user = user.id;

            // Enviar el email 
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })
            
            await Promise.allSettled([user.save(), token.save()]);

            res.send('Cuenta creada, revisa tu email para confirmarla')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;

            const tokenExist = await Token.findOne({token})

            if (!tokenExist) {
                const error = new Error('Token No Valido')
                return res.status(404).json({ error: error.message});
            }

            const user = await User.findById(tokenExist.user);
            user.confirmed = true;

            await Promise.allSettled([user.save(), tokenExist.deleteOne()]);
            res.send('Cuenta confirmada correctamente');
            
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
            
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({email});

            // User is not exist 
            if (!user) {
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({ error: error.message});
            }

            // User is not confirmed 
            if ( !user.confirmed ) {

                // Create a new token
                const token = new Token();
                token.token = generateToken();
                token.user = user.id;
                await token.save();

                // Send Email for confirmation
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })

                const error = new Error('La cuenta no ha sido confirmada, hemos enviado un e-mail de confirmacion');
                return res.status(401).json({error: error.message})
            }

            // Check Password 
            const isPasswordCorrect = await checkPassword(password, user.password);
            if( !isPasswordCorrect ) {
                const error = new Error('Password incorrecto');
                return res.status(401).json({error: error.message})
            }

            res.send('Autenticado......');

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }
}