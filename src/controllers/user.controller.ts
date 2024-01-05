import { Response, Request } from 'express';
import connection from '../database/connection'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export const addUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;
    
    const hashedPasswrod = await bcrypt.hash(password, 10);

    connection.query("INSERT INTO users SET ? ", { name, password: hashedPasswrod }, (err, data) => {
        if (err) console.log(err);
        else res.json({ msg: 'Added user' })
    });
}

export const loginUser = async (req: Request, res: Response) => {

    const {name, password} = req.body;

    connection.query("SELECT * FROM users WHERE name = " + connection.escape(name), (err, data) => {
        if(err) {
            console.log(err);
        } else {
            if(data.length == 0){
                res.json({ msg: "The user does not exist" })
            }else{
                const userPassword = data[0].password;
                bcrypt.compare(password, userPassword).then((result)=> {
                    if(result){
                        // generar el token
                        const token = jwt.sign({
                            name
                        }, process.env.SECRET_KEY || "rody", {
                            expiresIn: '10000'
                        })

                        res.json(token)
                    }else{
                        
                        res.json({ msg: "The password is incorrect!" })
                    }
                })
            }
        }
    });
}