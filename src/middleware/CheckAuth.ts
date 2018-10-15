import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export class CheckAuth {

    constructor() {
    }

    public verifyToken(req: Request, res: Response, next: Function) {
        try {

            let authorization = (req.headers.authorization || '');
            authorization = authorization.split(" ")[1];
            if (process.env.DO_JWT_VALIDATION === "true") {
                const decoded = jwt.verify(authorization, process.env.JWT_KEY || '');
            }
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Auth Failed'
            })
        }
        
    }
}