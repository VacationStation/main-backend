"use strict";
/**
 * Created by christiankalig on 27.06.17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth = require("ck-auth");
class AuthenticationRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    login(req, res, next) {
        return res.status(200).json({ auth: req.body.auth });
    }
    init() {
        this.router.post('/login', auth.login, this.login);
    }
}
exports.AuthenticationRouter = AuthenticationRouter;
exports.default = new AuthenticationRouter().router;
