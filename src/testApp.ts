import bodyParser from "body-parser";
import express, { Application } from "express";
import errorMiddleware from "./serverLayer/middleware/errorMiddleware";

export default class TestApp {
    protected readonly _app: Application;
    constructor() {
        this._app = express()
    }

    public async init() {
        this.initMiddlewares()
        this.useHealthController()
        this.registerControllers()
        this.useErrorMiddleware()
    }

    public start(port: number) {
        this._app.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        });
    }

    private initMiddlewares() {
        this._app.use(bodyParser.urlencoded({
            extended: true
        }))
        this._app.use(bodyParser.json())
    }

    private useHealthController() {
        this._app.get('/', (_, res) => {
            res.send('Server feels good')
        })
    }

    private useErrorMiddleware() {
        this._app.use(errorMiddleware)
    }

    private registerControllers() {

    }

    private printRoutes(): string[] {
        return (this._app._router.stack as any[]).filter(r => r.route).map(r => `${Object.keys(r.route.methods)}:${r.route.path}`)
    }
}

