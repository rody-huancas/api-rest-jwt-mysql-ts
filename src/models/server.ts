import express, { Application } from 'express';
import connection from '../database/connection';
import routesProducts from '../routes/product.routes';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.connectDB();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server listening on port ", this.port);
        });
    }

    connectDB() {
        connection.connect((err) => {
            if (err) console.log(err);
            else console.log("Connection established!")
        });
    }

    routes () {
        this.app.use("/api/products", routesProducts)
    }
}

export default Server;