import { Response, Request } from 'express';
import connection from '../database/connection'
import bcrypt from 'bcrypt';

export const addUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;
    
    const hashedPasswrod = await bcrypt.hash(password, 10);

    connection.query("INSERT INTO users SET ? ", { name, password: hashedPasswrod }, (err, data) => {
        if (err) console.log(err);
        else res.json({ msg: 'Added user' })
    });
}