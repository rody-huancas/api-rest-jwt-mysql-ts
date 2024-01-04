import { Response, Request } from 'express';
import connection from '../database/connection';

export const getProducts = (req: Request, res: Response) => {
    connection.query("SELECT * FROM products", (err, data) => {
        if(err) console.log(err);
        else res.json(data);
    })
}