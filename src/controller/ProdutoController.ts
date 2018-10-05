import { Request, Response, Router } from 'express';
import Produto from '../model/Produto';

export class ProdutoController {

    private _router: Router;

    constructor() {
        this._router = Router();
        this.routes();
    }

    private routes() {

        //this._router.get('/', this.all);
        //this._router.get('/:cod', this.one);
        this._router.post('/', this.create);
        //this._router.put('/:cod', this.update);
        //this._router.delete('/:cod', this.delete);
    }

    public create(req: Request, res: Response): void {
        const {
            cod,
            nome,
            descricao,
            valor
        } = req.body;

        const produto = new Produto({
            nome,
            cod,
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