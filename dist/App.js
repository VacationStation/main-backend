"use strict";
/**
 * Created by christiankalig on 27.06.17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("reflect-metadata");
const auth = require("ck-auth");
const mongoose = require("mongoose");
const Config_1 = require("./config/Config");
const AuthenticationRouter_1 = require("./routes/AuthenticationRouter");
const UserRouter_1 = require("./routes/UserRouter");
const GroupRouter_1 = require("./routes/GroupRouter");
const FinanceRouter_1 = require("./routes/FinanceRouter");
const ImageRouter_1 = require("./routes/ImageRouter");
class App {
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
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json({ limit: '50mb' }));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cors());
        auth.init(Config_1.Config.userAuthUrl, {}, true);
    }
    /**
     * configures the api router
     */
    config() {
        this.express.use('/api/doc', express.static(__dirname + '/apidoc'));
        this.apiRouter = express.Router();
        this.apiRouter.get('/', (req, res, next) => {
            res.json({
                message: 'Vacation Station Backend API version 1'
            });
        });
        this.express.use('/api/v1', this.apiRouter);
        mongoose.connect(Config_1.Config.mongoUrl, function (err) {
            if (err)
                console.error(err);
            console.log("MONGO DB CONNECTION ESTABLISHED");
        });
    }
    /**
     * assigns the routes to specific routers
     */
    routes() {
        this.apiRouter.use('/auth', AuthenticationRouter_1.default);
        this.apiRouter.use('/user', UserRouter_1.default);
        this.apiRouter.use('/group', auth.verify, GroupRouter_1.default);
        this.apiRouter.use('/finance', auth.verify, FinanceRouter_1.default);
        this.apiRouter.use('/image', auth.verify, ImageRouter_1.default);
    }
}
/**
 * exports new express instance
 */
exports.default = new App().express;
