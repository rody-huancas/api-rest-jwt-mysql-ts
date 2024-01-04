import express, { Application } from 'express';
import connection from '../database/connection';
import routesProducts from '../routes/product.routes';
import routesDefault from '../routes/default.routes';
import routesUsers from '../routes/user.routes';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.connectDB();
        this.midlewares();
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
        this.app.use("/", routesDefault);
        this.app.use("/api/products", routesProducts)
        this.app.use("/api/users", routesUsers)
    }

    midlewares () {
        this.app.use(express.json());
    }
}

export default Server;