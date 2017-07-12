"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by nkrei001 on 01.07.17.
 */
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const auth = require("ck-auth");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
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
    getUser(req, res, next) {
        let id = req.params.id;
        UserController_1.UserController.getById(id).then(function (result) {
            return res.status(200).json({ success: true, user: result });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
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
    addUser(req, res, next) {
        //TODO check permissions
        UserController_1.UserController.createUser(req.body.user).then(function (result) {
            return res.status(200).json({ success: true, user: result });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
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
    deleteUser(req, res, next) {
        let id = req.params.id;
        //TODO check permission
        UserController_1.UserController.delUser(id).then(function (result) {
            return res.status(200).json({ success: true, result: result });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
        });
    }
    init() {
        this.router.get("/:id", this.getUser);
        this.router.post("/", auth.register, this.addUser);
        this.router.delete('/:id', this.deleteUser);
    }
}
exports.UserRouter = UserRouter;
exports.default = new UserRouter().router;
