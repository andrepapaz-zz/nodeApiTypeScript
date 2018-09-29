import { Server } from './server';

class ApiApplication {

    private server: Server;
    private porta: String;

    constructor() {
        this.server = new Server();
        this.porta = process.env.PORT || "3000";
    }

    public startServer() {
        this.server.app.listen(this.porta, () => {
            console.log(`Servidor executando na porta ${this.porta} em ambiente de ${process.env.NODE_ENV}.`);
        });
    }
}

new ApiApplication().startServer();