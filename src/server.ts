import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ProdutoController } from './controller/ProdutoController';
import { UserController } from './controller/UserController';
import { LoginController } from './controller/LoginController';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import rts from 'rotating-file-stream';

export class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {

        let accessLogDirectory = path.join(__dirname, 'accessLog');
        let uploadsDirectory = '/uploads';

        fs.existsSync(accessLogDirectory) || fs.mkdirSync(accessLogDirectory);

        function generator(time: Date, index: String) {
            if (!time)
                return "accessLog.log";

            return `accessLog${index}.log`;
        }

        let stream = rts(generator, {
            path: accessLogDirectory,
            size: '10M',
            maxFiles: 10
        })

        const MONGO_URI: string = 'mongodb://localhost:17017/martan';
        mongoose.connect(process.env.MONGODB_URI || MONGO_URI || "", { useNewUrlParser: true });

        this.app.use(morgan(':date[iso] :method :url :status :response-time[0]ms :res[content-length]Bytes', { stream: stream }));
        this.app.use(morgan(':date[iso] :method :url :status :response-time[0]ms :res[content-length]Bytes'));
        this.app.use(uploadsDirectory, express.static('uploads'));
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json());
        this.app.use(helmet());

    }

    private routes() {

        this.app.use('/api/produto', new ProdutoController().router);
        this.app.use('/api/user', new UserController().router);
        this.app.use('/api/user', new LoginController().router);

    }

}