import * as express from 'express';


export class Server {
    
    public app: express.Application;

    constructor() {
        this.app = express();
    }

}