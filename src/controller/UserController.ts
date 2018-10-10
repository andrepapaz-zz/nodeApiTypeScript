import { Request, Response, Router } from 'express';
import User from '../model/User';
import * as bcrypt from 'bcrypt-nodejs';

export class UserController {

    private _router: Router;

    constructor() {
        this._router = Router();
        this.routes();
    }

    private routes() {

        this._router.get('/', this.all);
        this._router.get('/:cod', this.one);
        this._router.post('/', this.create);
        this._router.put('/:cod', this.update);
        this._router.delete('/:cod', this.delete);
    }

    public all(req: Request, res: Response): void {
        User.find()
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public one(req: Request, res: Response): void {
        const cod = req.params.cod;

        User.findOne({ cod })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }


    public create(req: Request, res: Response): void {
        const {
            email,
            password
        } = req.body;

        bcrypt.hash(password, "", () => {}, (err: Error, hash: string) => {
            
            const user = new User({
                email,
                password: hash
            });
    
            user
                .save()
                .then((data) => {
                    res.status(201).json({ data });
                })
                .catch((error) => {
                    res.status(500).json({ error });
                });
                
        });

    }

    public update(req: Request, res: Response): void {
        const cod = req.params.cod;

        User.findOneAndUpdate({ cod }, req.body)
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public delete(req: Request, res: Response): void {
        const cod = req.params.cod;

        User.findOneAndRemove({ cod })
            .then(() => {
                res.status(204).end();
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public get router(): Router {
        return this._router;
    }

}