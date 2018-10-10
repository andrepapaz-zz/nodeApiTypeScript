import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ProdutoController } from './controller/ProdutoController';
import { UserController } from './controller/UserController';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';

export class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {

        // create a write stream (in append mode)
        let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

        const MONGO_URI: string = 'mongodb://192.168.99.100:27017/martan';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI || "", { useNewUrlParser: true });

        this.app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]', { stream: accessLogStream}));
        this.app.use(morgan('dev'));
        this.app.use('/uploads', express.static('uploads'));
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json());
        this.app.use(helmet());

    }

    private routes() {

        this.app.use('/api/produto', new ProdutoController().router);
        this.app.use('/api/user', new UserController().router);

    }

}