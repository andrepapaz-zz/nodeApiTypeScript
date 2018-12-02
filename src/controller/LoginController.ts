import { Request, Response, Router } from 'express';
import User from '../model/User';
import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';

export class LoginController {

    private _router: Router;

    constructor() {
        this._router = Router();
        this.routes();
    }

    private routes() {

        this._router.post('/login', this.login);

    }

    public login(req: Request, res: Response): void {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    res.status(401).json({
                        message: 'Auth Failed'
                    })
                } else {
                    let jsonuser = user.toJSON();

                    bcrypt.compare(req.body.password, jsonuser.password, (err, result) => {
                        if (err) {
                            return res.status(401).json({
                                message: 'Auth Failed'
                            });
                        }
                        if (result) {

                            let secretWJWTKey: string = process.env.JWT_KEY || '';

                            let token = jwt.sign({
                                email: jsonuser.email,
                                userId: jsonuser._id
                            },
                            secretWJWTKey, 
                            {
                                expiresIn: 60
                            })
                            // TODO: Colocar o tempo de expiração em Variavel de ambiente
                            return res.json({
                                message: 'Auth Successful',
                                token
                            });
                        } else {
                            return res.status(401).json({
                                message: 'Auth Failed'
                            });
                        }
                    });
                }

                /* if (user && user) {

                    bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                        
                    })

                } */
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err })
            });
    }

    public get router(): Router {
        return this._router;
    }

}