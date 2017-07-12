"use strict";
/**
 * Created by nkrei001 on 01.07.17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Group_1 = require("../models/Group");
class UserController {
    /**
     * get User by Id
     * @param id
     * @returns {any}
     */
    static getById(id) {
        return new Promise((resolve, reject) => {
            User_1.User.findById(id)
                .then((user) => resolve(user))
                .catch(err => reject(err));
        });
    }
    /**
     * adds new user
     * @param user
     */
    static createUser(data) {
        data.externalId = data.id;
        return User_1.User.create(data);
    }
    /**
     * deletes an user
     * @param id
     */
    static delUser(id) {
        //TODO check permission
        return new Promise((resolve, reject) => {
            User_1.User.findByIdAndRemove(id)
                .then((result) => resolve(result))
                .catch(err => reject(err));
        });
    }
    static getGroupsByUser(id) {
        return new Promise((resolve, reject) => {
            Group_1.Group.find({ "member": id });
        });
    }
}
exports.UserController = UserController;
exports.default = new UserController();
