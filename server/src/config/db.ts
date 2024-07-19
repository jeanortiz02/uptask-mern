import mongoose from "mongoose";
import { exit } from 'node:process';
import color from 'colors';


export const connectDB = async() => {

    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)
        const url = ` ${connection.host} : ${connection.port}`
        console.log(color.magenta(`MongoDB connectado en ${url}`))
    } catch (error) {
        console.log(color.bgRed.bold('Error en la base de datos'));
        exit(1)
    }
}