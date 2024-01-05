import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers["authorization"];

    if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
        const bearerToken = headerToken.slice(7);
        try {
            const tokenValidate = jwt.verify(bearerToken, process.env.SECRET_KEY || "rody");
            console.log(tokenValidate);
            next();

        } catch (error) {
            res.status(400).json({
                error: "Token not valid!"
            })
        }
    } else {
        res.status(400).json({
            error: "Access denied!"
        })
    }
}