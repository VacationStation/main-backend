/**
 * Created by christiankalig on 27.06.17.
 */

import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import 'reflect-metadata';
import * as auth from 'ck-auth';
import * as mongoose from 'mongoose';
import {Config} from './config/Config';
import AuthenticationRouter from './routes/AuthenticationRouter';
import UserRouter from "./routes/UserRouter";
import GroupRouter from './routes/GroupRouter';
import FinanceRouter from './routes/FinanceRouter';
import ImageRouter from './routes/ImageRouter';
import {TSPromise} from 'typescript-promise';


class App {

    public express: express.Application;

    private apiRouter: express.Router;

    /**
     * instantiates new express application and calls functions for adding middleware, configuration of routers and assigning the routes
     */
    constructor() {
        this.express = express();
        this.middleware();
        this.config();
        this.routes();
    }

    /**
     * wires in middleware functions
     */
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json({limit: '50mb'}));
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(cors());
        auth.init(Config.userAuthUrl, {}, true);
    }

    /**
     * configures the api router
     */
    private config(): void {
        this.express.use('/api/doc', express.static(__dirname + '/apidoc'));
        this.apiRouter = express.Router();
        this.apiRouter.get('/', (req, res, next) => {
            res.json({
                message: 'Vacation Station Backend API version 1'
            });
        });
        this.express.use('/api/v1', this.apiRouter);
        mongoose.connect(Config.mongoUrl, function(err) {
            if(err) console.error(err);
            console.log("MONGO DB CONNECTION ESTABLISHED");
        });
    }

    /**
     * assigns the routes to specific routers
     */
    private routes(): void {
        this.apiRouter.use('/auth', AuthenticationRouter);
        this.apiRouter.use('/user', UserRouter);
        this.apiRouter.use('/group', auth.verify, GroupRouter);
        this.apiRouter.use('/finance', auth.verify, FinanceRouter);
        this.apiRouter.use('/image', auth.verify, ImageRouter);
    }

}

/**
 * exports new express instance
 */
export default new App().express;