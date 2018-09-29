import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ProdutoController } from './Controller/ProdutoController';
import * as helmet from 'helmet';

export class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {

        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json());
        this.app.use(helmet());

    }

    private routes() {

        this.app.use('/api/produto', new ProdutoController().router);

    }

}