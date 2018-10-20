import { Request, Response, Router } from 'express';
import ProdutoSchema from '../schema/ProdutoSchema';
import * as multer from 'multer';
import { ProdutoService } from '../service/ProdutoService';
import { ICRUDService } from '../service/ICRUDService';
import { Produto } from '../model/Produto';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '_' + file.originalname);
    }
});

const fileFilter = (req: Request, file: any, cb: Function) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

export class ProdutoController {

    private _router: Router;
    private _service: ICRUDService<Produto, String>;

    constructor() {
        this._service = new ProdutoService();
        this._router = Router();
        this.routes();
    }

    private routes() {

        this._router.get('/', this.all.bind(this));
        this._router.get('/:cod', this.one.bind(this));
        this._router.post('/', upload.single('productImage'), this.create);
        this._router.put('/:cod', this.update);
        this._router.delete('/:cod', this.delete);
    }

    public all(req: Request, res: Response): void {
        this._service.listAll()
            .then(produtos => {
                res.json({ data: produtos })
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public one(req: Request, res: Response): void {
        const cod = req.params.cod;

        this._service.getOne(cod)
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

        const image = req.file.path;

        const produtoSchema = new ProdutoSchema({
            cod,
            nome,
            descricao,
            valor,
            image
        });

        produtoSchema
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

        ProdutoSchema.findOneAndUpdate({ cod }, req.body)
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public delete(req: Request, res: Response): void {
        const cod = req.params.cod;

        ProdutoSchema.findOneAndRemove({ cod })
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