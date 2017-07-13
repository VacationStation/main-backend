/**
 * Created by christiankalig on 27.06.17.
 */

import {Router, Request, Response, NextFunction} from 'express';
import * as auth from 'ck-auth';

export class AuthenticationRouter {

    public router: Router;

    constructor () {
        this.router = Router();
        this.init();
    }

    private login (req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({auth: req.body.auth});
    }

    private init() {
        this.router.post('/login', auth.login, this.login);
    }

}

export default new AuthenticationRouter().router;