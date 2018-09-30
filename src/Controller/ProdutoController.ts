import { Request, Response, Router } from 'express';
import Produto from '../Model/Produto';

export class ProdutoController {

    private _router: Router;

    constructor() {
        this._router = Router();
        this.routes();
    }

    private routes() {
        this._router.get('/teste', this.teste);
        this.router.post('/', this.create);
    }

    private teste(req: Request, res: Response): void {
        res.json({
            teste: 'OK'
        });
    }

    public create(req: Request, res: Response): void {
        const {
            nome,
            slug,
        } = req.body;

        const produto = new Produto({
            nome,
            slug,
        });

        produto
            .save()
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public get router(): Router {
        return this._router;
    }

}