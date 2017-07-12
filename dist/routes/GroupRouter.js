"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by nkrei001 on 01.07.17.
 */
const express_1 = require("express");
const GroupController_1 = require("../controller/GroupController");
const User_1 = require("../models/User");
class GroupRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * @api {get} /group/:id getGroup
     * @apiName getGroup
     * @apiGroup Group
     * @apiDescription Returns Group data by id
     * @apiParam {Number} id Groups unique ID
     *
     * @apiSuccess {Number} id Group ID
     * //TODO add group fields
     * @apiSuccessExample {json} Success-Response:
     *
     *     {
     *      "success": true,
     *      "group": {
     *          "id" : "",
     *          ...
     *      }
     *     }
     *
     * @apiError GroupNotFound The id of the Group was not found
     */
    /**
     * get group:id
     * @param req
     * @param res
     * @param next
     */
    getGroup(req, res, next) {
        let id = req.params.id;
        GroupController_1.GroupController.findGroupById(id).then(function (result) {
            return res.status(200).json({ success: true, data: result });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
        });
    }
    /**
     * @api {post} /group addGroup
     * @apiName addGroup
     * @apiGroup Group
     * @apiDescription Adds a new Group
     * @apiParam {String} groupName
     * @apiParam {Text} groupDescription
     *
     * @apiSuccess {Number} id Group ID
     * @apiSuccess {String} invitationKey The invitation key new users have to provide if they want to join the group
     * //TODO add group fields
     */
    /**
     * create new group
     * @param req
     * @param res
     * @param next
     */
    createGroup(req, res, next) {
        console.log(req.body.user);
        let data = req.body;
        GroupController_1.GroupController.saveGroup(data, req.body.user).then(function (group) {
            return res.status(200).json({ success: true, data: group });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
        });
    }
    /**
     * @api {get} /group/invite/:id getInvitation
     * @apiName getInvotation
     * @apiGroup Group
     * @apiDescription Returns Group invitation link
     * @apiParam {Number} id Groups unique ID
     *
     * @apiSuccess {String} invitationKey
     *
     * @apiError GroupNotFound The id of the Group was not found
     */
    /**
     * get invitation code/link
     * @param req
     * @param res
     * @param next
     */
    invite(req, res, next) {
        let id = req.params.id;
        GroupController_1.GroupController.getInvite(id).then(function (invite) {
            return res.status(200).json({ success: true, invite: invite });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
        });
    }
    /**
     * @api {post} /group/:id/addBill addBill
     * @apiName addBill
     * @apiGroup Group
     * @apiParam {Number} id Groups unique ID
     * @apiParam {Object} bill
     * @apiParam {Number} bill.image Image id
     * @apiParam {Object[]} bill.positions Array of Positions. If you want to add a total: only provide one Position of Type: TOTAL, quantity 1 and price as your total sum
     * @apiPAram {String} bill.positions.type TOTAL / ITEM
     * @apiPAram {Number} bill.positions.quantity
     * @apiParam {Number} bill.positions.price Price in EUR cent
     * @apiParam {String} bill.positions.name
     * @apiParam {Object} data
     * @apiParam {String} data.usage Usage of expense
     * @apiParam {String} data.biller User ID of the User who submits the invoice
     * @apiParam {Boolean} data.forAll True if the bill is for all Group Members. Otherwise you have to provide recipients and set forAll to False.
     * @apiParam {String[]} [data.recipients] Array of Group Members (ID's)
     * @apiParamExample {json} Request-Example:
     *        {
     * 			"bill": {
     * 		        "image" : "imageId",
     * 		        "positions" : [
     * 		               {
     * 		                  "type" : "TOTAL",
     * 		                  "quantity" : "1",
     * 		                  "price" : "12345",
     * 		                  "name" : "Your total bill"
     * 		               },...
     * 		           ]
     * 	        },
     * 	        "data": {
     * 	            "usage": "for use"
     * 	            "biller": "1",
     * 	            "forAll" : true
     * 	        }
     * 		 }
     */
    /**
     * add bill to group:id
     * @param req
     * @param res
     * @param next
     */
    addBill(req, res, next) {
        let id = req.params.id;
        let data = req.body;
        GroupController_1.GroupController.addBill(id, data, req.body.user).then(function (bookings) {
            return res.status(200).json({ success: true, groups: bookings });
        }).catch(function (err) {
            return res.status(500).json({ succes: false, error: err });
        });
    }
    /**
     * @api {put} /group/:groupId/add/:userId addUser
     * @apiName addUser
     * @apiGroup Group
     * @apiDescription Add User to Group if provided initation key is valid
     * @apiParam {Number} groupId Groups unique ID
     * @apiParam {Number} userId Users unique ID
     *
     * @apiParam {String} key The invitation key a Group member has provided.
     * @apiParamExample {json} Request-Example:
     *        {
     * 			"key": "InviteMe"
     * 		 }
     * @apiError GroupNotFound The id of the Group was not found
     * @apiError UserNotFound The id of the User was not found
     * @apiError (Error Invalid) InvalidKey The invitationKey is invalid
     *
     */
    /**
     * add User to group:id if provided invitation code is valid
     * @param req
     * @param res
     * @param next
     */
    addUser(req, res, next) {
        //TODO call method? GET/PUT?
        let user = req.body.user;
        let key = req.body.key;
        console.log("GroupRouter", req.body);
        GroupController_1.GroupController.addUser(user, key).then(function (result) {
            return res.status(200).json({ success: true, member: result });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
        });
    }
    /**
     * @api {delete} /group/:groupId/remove/:userId removeUser
     * @apiName removeUser
     * @apiGroup Group
     * @apiDescription Remove User from Group
     * @apiParam {Number} groupId Groups unique ID
     * @apiParam {Number} userId Users unique ID
     * @apiParam {String} ownerId The id of the User who wants to remove an User. Only the Group owner is allowed to remove User from Group.
     * @apiParamExample {json} Request-Example:
     *        {
     * 			"id": "1"
     * 		 }
     * @apiError GroupNotFound The id of the Group was not found
     * @apiError UserNotFound The id of the User was not found
     *
     */
    /**
     * remove user:id from group:id
     * @param req
     * @param res
     * @param next
     */
    removeUser(req, res, next) {
        let groupId = req.params.groupId;
        let userId = req.params.userId;
        let owner = req.body.id;
        GroupController_1.GroupController.removeUser(groupId, userId, owner).then(function (result) {
            return res.status(200).json({ success: true, member: result });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
        });
    }
    /**
     * @api {get} /group/user/:id getGroupsByUser
     * @apiName getGroupsByUser
     * @apiGroup Group
     * @apiDescription Get all Groups the given User is member of
     * @apiParam {Number} id Users unique ID
     *
     * @apiError UserNotFound The id of the User was not found
     *
     */
    /**
     * get groups where user:id is member
     * @param req
     * @param res
     * @param next
     */
    getGroupByUser(req, res, next) {
        let userId = req.params.id;
        GroupController_1.GroupController.findGroupsWithUserId(userId).then(function (result) {
            return res.status(200).json({ success: true, groups: result });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
        });
    }
    ;
    //TODO: add api doc
    getOwnGroups(req, res, next) {
        console.log("getOwnGroups", req.body.user);
        GroupController_1.GroupController.findGroupsWithUserId(req.body.user._id).then(function (result) {
            return res.status(200).json({ success: true, groups: result });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
        });
    }
    ;
    /**
     * @api {post} /group/:id/makeDeposit makeDeposit
     * @apiName makeDeposit
     * @apiGroup Group
     * @apiParam {Number} id Groups unique ID
     * @apiParam {String} userID The Users ID
     * @apiParam {Number} amount Amount in EUR Cent
     * @apiParam {String} [usage] Optional Note
     * @apiParamExample {json} Request-Example:
     *        {
     * 			"biller" : "1",
     * 		   "amount" : 2085,
     * 		 }
     */
    makeDeposit(req, res, next) {
        let groupId = req.params.id;
        let data = req.body;
        GroupController_1.GroupController.addDeposit(groupId, data).then(function (result) {
            return res.status(200).json({ success: true, group: result });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
        });
    }
    init() {
        /**
         * GET
         */
        this.router.get('/user', this.extractUser, this.getOwnGroups);
        this.router.get('/user/:id', this.extractUser, this.getGroupByUser);
        this.router.get('/invite/:id', this.extractUser, this.invite);
        this.router.get('/:id', this.extractUser, this.getGroup);
        /**
         * POST
         */
        this.router.post('/:id/addBill', this.extractUser, this.addBill);
        this.router.post('/:id/makeDeposit', this.extractUser, this.makeDeposit);
        this.router.post('/', this.extractUser, this.createGroup);
        /**
         * PUT
         */
        this.router.put('/add/user', this.extractUser, this.addUser);
        /**
         * DELETE
         */
        this.router.delete('/:groupId/remove/:userId', this.extractUser, this.removeUser);
    }
    extractUser(req, res, next) {
        console.log(req.body.auth.user.user.id);
        User_1.User.findOne({ externalId: req.body.auth.user.user.id }, function (err, user) {
            if (err)
                next(err);
            if (!user)
                next(new Error("No User found!"));
            req.body.user = user;
            next();
        });
    }
}
exports.GroupRouter = GroupRouter;
exports.default = new GroupRouter().router;
