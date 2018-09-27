import { Server } from './server';

let server = new Server();

let porta = process.env.PORT || 3000;

server.app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta} em ambiente de ${process.env.NODE_ENV}.`);
});