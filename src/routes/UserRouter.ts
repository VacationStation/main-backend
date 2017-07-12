/**
 * Created by nkrei001 on 01.07.17.
 */
import {Router, Request, Response, NextFunction} from 'express';
import {UserController} from '../controller/UserController';
import GroupController from '../controller/GroupController';

import * as auth from 'ck-auth';

export class UserRouter {

    public router: Router;

    constructor () {
        this.router = Router();
        this.init();
    }
    /**
     * @api {get} /user/:id getUser
     * @apiName getUser
     * @apiGroup User
     * @apiDescription Returns User data by id
     * @apiParam {Number} id Users unique ID
     *
     * @apiSuccess {Number} id User ID
     * //TODO add user fields
     * @apiSuccessExample {json} Success-Response:
     *
     *     {
     *      "success": true,
     *      "user": {
     *          "id" : "",
     *          ...
     *      }
     *     }
     *
     * @apiError UserNotFound The id of the User was not found
     */
    private getUser (req: Request, res: Response, next: NextFunction) {

        let id = req.params.id;
        UserController.getById(id).then(function(result){
            return res.status(200).json({success: true, user : result});
        }).catch( function(err) {
            return res.status(500).json({success: false, error: err});
        });

    }

    /**
     * @api {post} /user addUser
     * @apiName addUser
     * @apiGroup User
     * @apiDescription Adds a new User
     * @apiParam {String} loginName
     * @apiParam {String} [firstName]
     * @apiParam {String} [lastName]
     * @apiParam {String} mail
     * @apiSuccess {Number} id User ID
     * //TODO add user fields
     */
    private addUser(req: Request, res: Response, next: NextFunction){
        //TODO check permissions
        UserController.createUser(req.body.user).then(function(result){
            return res.status(200).json({success: true, user: result});
        }).catch(function(err){
            return res.status(500).json({success: false, error: err});
        });
    }

    /**
     * @api {delete} /user/:id deleteUser
     * @apiName deleteUser
     * @apiGroup User
     * @apiDescription Deletes User with given id
     *
     * @apiParam {Number} id Users unique ID
     *
     *
     */
    private deleteUser(req: Request, res: Response, next: NextFunction){
        let id = req.params.id;
        //TODO check permission
        UserController.delUser(id).then( function(result){
            return res.status(200).json({success: true, result: result});
        }).catch( function(err){
            return res.status(500).json({success: false, error: err});
        });
    }

    private init(){
        this.router.get("/:id", this.getUser);
        this.router.post("/", auth.register, this.addUser);
        this.router.delete('/:id', this.deleteUser);
    }
}

export default new UserRouter().router;