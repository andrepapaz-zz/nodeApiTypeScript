import { Request, Response, Router } from 'express';

export class ProdutoController {

    private _router: Router;

    constructor() {
        this._router = Router();
        this.routes();
    }

    private routes() {
        this._router.get('/teste', this.teste);
    }

    private teste(req: Request, res: Response): void {
        res.json({
            teste: 'OK'
        });
    }

    public get router() : Router {
        return this._router;
    }

}