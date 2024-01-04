import { Response, Request } from 'express';

export const getDefault = (req: Request, res: Response) => {
    res.json({
        msg: "API working correctly!"
    });
}