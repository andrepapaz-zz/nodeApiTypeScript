import { Request, Response, Router } from 'express';
import Produto from '../model/Produto';

export class ProdutoController {

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
        Produto.find()
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public one(req: Request, res: Response): void {
        const cod = req.params.cod;

        Produto.findOne({ cod })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    
    public create(req: Request, res: Response): void {
        const {
            cod,
            nome,
            descricao,
            valor
        } = req.body;
        
        const produto = new Produto({
            cod,
            nome,
            descricao,
            valor
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
    
    public update(req: Request, res: Response): void {
        const cod = req.params.cod;

        Produto.findOneAndUpdate({ cod }, req.body)
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public delete(req: Request, res: Response): void {
        const cod = req.params.cod;

        Produto.findOneAndRemove({ cod })
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