import { Request, Response, Router } from 'express';
import User from '../model/User';
import * as bcrypt from 'bcrypt-nodejs';
import {CheckAuth} from '../middleware/CheckAuth';

export class UserController {

    private _router: Router;

    constructor() {
        this._router = Router();
        this.routes();
    }

    private routes() {

        let checkauth = new CheckAuth();
        this._router.get('/', checkauth.verifyToken, this.all);
        this._router.get('/:_id', this.one);
        this._router.post('/', this.create);
        this._router.put('/:_id', this.update);
        this._router.delete('/:_id', this.delete);
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
        const _id = req.params._id;

        User.findOne({ _id })
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

        const salt = bcrypt.genSaltSync(10);

        bcrypt.hash(password, salt, () => { }, (err: Error, hash: string) => {

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
        const _id = req.params._id;

        let userUpdated = req.body;

        const salt = bcrypt.genSaltSync(10);

        bcrypt.hash(userUpdated.password, salt, () => { }, (err: Error, hash: string) => {

            userUpdated.password = hash;

            User.findOneAndUpdate({ _id }, userUpdated)
                .then((data) => {
                    res.status(200).json({ data });
                })
                .catch((error) => {
                    res.status(500).json({ error });
                });

        });


    }

    public delete(req: Request, res: Response): void {
        const _id = req.params._id;

        User.findOneAndRemove({ _id })
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