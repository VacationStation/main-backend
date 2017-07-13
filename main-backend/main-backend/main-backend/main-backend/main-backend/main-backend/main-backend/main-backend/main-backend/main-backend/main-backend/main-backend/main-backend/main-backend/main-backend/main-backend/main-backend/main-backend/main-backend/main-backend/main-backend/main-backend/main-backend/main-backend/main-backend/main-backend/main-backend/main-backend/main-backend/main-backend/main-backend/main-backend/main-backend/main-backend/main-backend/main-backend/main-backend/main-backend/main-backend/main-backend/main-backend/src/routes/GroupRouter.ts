/**
 * Created by nkrei001 on 01.07.17.
 */
import {Router, Request, Response, NextFunction} from 'express';
import {GroupController} from "../controller/GroupController";

import {User} from '../models/User';


export class GroupRouter{

    public router: Router;

    constructor () {
        this.router = Router();
        this.init();
    }

    /**
     * @api {get} /group/:id getGroup
     * @apiName getGroup
     * @apiGroup Group
     * @apiDescription Returns Group data by id
     * @apiParam {String} id Groups unique ID
     *
     * @apiSuccess {String} id Group ID
     * @apiSuccess {Date} creationDate
     * @apiSuccess {String} name
     * @apiSuccess {String} description
     * @apiSuccess {String} destination
     * @apiSuccess {Date} dateFrom
     * @apiSuccess {dateTo} dateTo
     * @apiSuccess {Object} owner User who owns the Group
     * @apiSuccess {String} owner.id
     * @apiSuccess {String} owner.loginName
     * @apiSuccess {String} owner.firstName
     * @apiSuccess {String} owner.lastName
     * @apiSuccess {String} owner.mail
     * @apiSuccess {Object[]} bookings
     * @apiSuccess {String} bookings.usage
     * @apiSuccess {Object} bookings.biller  User who has paid the bill
     * @apiSuccess {String} bookings.biller.id
     * @apiSuccess {String} bookings.biller.loginName
     * @apiSuccess {String} bookings.biller.firstName
     * @apiSuccess {String} bookings.biller.lastName
     * @apiSuccess {String} bookings.biller.mail
     * @apiSuccess {Boolean} bookings.forAll True as default. If the invoice is adressed to special users, set it to false and list the Users as recipients
     * @apiSuccess {Object[]} bookings.recipients The List of Users to which the invoice is addressed if forAll is false
     * @apiSuccess {String} bookings.type Booking Type can either be "BILL" or "DEPOSIT". As default, forAll is true and list of recipients is empty
     * @apiSuccess {Number} bookings.amount total in EUR Cent
     * @apiSuccess {Date} bookings.date
     * @apiSuccess {String[]} invite List of generated invitiation Codes
     * @apiSuccessExample {json} Success-Response:
     *
     *     {
     *      "success": true,
     *      "group": {
     *          "id" : "",
     *          "creationDate": "",
  	 *          "name": "TestGruppe",
  	 *          "description": "Test Beschreibung",
  	 *          "destination": "Testgebiet",
  	 *          "dateFrom": "",
  	 *          "dateTo": "",
  	 *          "owner": {
     *
  	 *           },
  	 *          "member": [
  	 *	            { "loginName": "user1",
  	 *          	  "firstName": "Kai",
  	 *          	  "lastName": "Ahnung",
  	 *          	  "mail": "kai@ahnung.de"
  	 *          	},
  	 *	            {..}
     *	        ],
  	 *          "bookings": [
  	 *      	    { "usage": "Getraenke",
  	 *          	  "biller": {
  	 *     	  	    	"loginName": "user1",
  	 *      	  		"firstName": "Kai",
  	 *      	  		"lastName": "Ahnung",
  	 *      	  		"mail": "kai@ahnung.de"
  	 *      	  		},
  	 *          	  "forAll": "true",
  	 *          	  "recipients": [],
  	 *          	  "type": "BILL",
  	 *          	  "amount": "5678",
  	 *          	  "date": ""
  	 *         	  },
  	 *         	{..}
  	 *          ],
  	 *          "invite" :[
	 *          	"AG52I8F",
	 *          	"59OSM40"
  	 *          ]
     *      }
     * @apiError GroupNotFound The id of the Group was not found
     */
    /**
     * get group:id
     * @param req
     * @param res
     * @param next
     */
    private getGroup(req: Request, res: Response, next: NextFunction){
        let id = req.params.id;
        GroupController.findGroupById(id).then(function(result){
            return res.status(200).json({success: true, data: result});
        }).catch(function(err){
            return res.status(500).json({success: false, error: err});
        })
    }
    /**
     * @api {post} /group addGroup
     * @apiName addGroup
     * @apiGroup Group
     * @apiDescription Adds a new Group
     * @apiParam {String} name
     * @apiParam {String} description
     * @apiParam {String} destination
     * @apiParam {Date} dateFrom
     * @apiParam {dateTo} dateTo
     *
     * @apiSuccess {String} id Group ID
     *
     */
    /**
     * create new group
     * @param req
     * @param res
     * @param next
     */
    private createGroup(req: Request, res: Response, next: NextFunction){
        console.log(req.body.user);
            let data = req.body;
            GroupController.saveGroup(data, req.body.user).then(function(group){
                return res.status(200).json({success: true, data: group});
            }).catch(function(err){
                return res.status(500).json({success: false, error: err});
            });
    }
    /**
     * @api {get} /group/invite/:id getInvitation
     * @apiName getInvotation
     * @apiGroup Group
     * @apiDescription Returns Group invitation link
     * @apiParam {String} id Groups unique ID
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
    private invite(req: Request, res: Response, next: NextFunction){
        let id = req.params.id;

        GroupController.getInvite(id).then(function(invite){
            return res.status(200).json({success: true, invite: invite});
        }).catch(function(err){
            return res.status(500).json({success: false, error: err});
        })
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
    private addBill(req: Request, res: Response, next: NextFunction){
        let id = req.params.id;
        let data = req.body;
        GroupController.addBill(id, data).then(function(bookings){
            return res.status(200).json({success: true, groups: bookings});
        }).catch(function(err){
            return res.status(500).json({succes: false, error: err});
        });
    }
    /**
     * @api {put} /group/add addUser
     * @apiName addUser
     * @apiGroup Group
     * @apiDescription Add User to Group if provided initation key is valid
     * @apiParam {String} key Invitation key
     * @apiParamExample {json} Request-Example:
     *        {
     * 			"key": "InviteMe"
     * 		 }
     * @apiError UserNotFound The id of the User was not found
     * @apiError (Error Invalid) InvalidKey The invitationKey is invalid
     *
     */
    /**
     * add User to group
     * @param req
     * @param res
     * @param next
     */
    private addUser(req: Request, res: Response, next: NextFunction){
        let user = req.body.user;
        let key = req.body.key;
        console.log("GroupRouter", req.body);

        GroupController.addUser(user, key).then(function(result){
            return res.status(200).json({success: true, member: result});
        }).catch(function(err){
            return res.status(500).json({success: false, error: err});
        })
    }
    /**
     * @api {delete} /group/:groupId/remove/:userId removeUser
     * @apiName removeUser
     * @apiGroup Group
     * @apiDescription Remove User from Group
     * @apiParam {String} groupId Groups unique ID
     * @apiParam {String} userId Users unique ID
     * @apiParam {String} ownerId The id of the User who wants to remove an User. Only the Group owner is allowed to remove User from Group.
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
    private removeUser(req: Request, res: Response, next: NextFunction){
        let groupId = req.params.groupId;
        let userId = req.params.userId;
        let owner = req.body.id;

        GroupController.removeUser(groupId, userId, owner).then(function(result){
            return res.status(200).json({success: true, member: result});
        }).catch(function(err){
            return res.status(500).json({success: false, error: err});
        });
    }

    /**
     * @api {get} /group/user/:id getGroupsByUser
     * @apiName getGroupsByUser
     * @apiGroup Group
     * @apiDescription Get all Groups the given User is member of
     * @apiParam {String} id Users unique ID
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
    private getGroupByUser(req: Request, res: Response, next: NextFunction){
        let userId = req.params.id;
        GroupController.findGroupsWithUserId(userId).then(function(result){
            return res.status(200).json({success: true, groups: result});
        }).catch(function(err){
            return res.status(500).json({success: false, error: err});
        });
    };

    /**
     * @api {get} /group/user getOwnGroups
     * @apiName getOwnGroups
     * @apiGroup Group
     * @apiDescription Get all Groups the logged in User belongs to
     *
     *
     */
    private getOwnGroups(req: Request, res: Response, next: NextFunction) {
        console.log("getOwnGroups", req.body.user);
        GroupController.findGroupsWithUserId(req.body.user._id).then(function(result){
            return res.status(200).json({success: true, groups: result});
        }).catch(function(err){
            return res.status(500).json({success: false, error: err});
        });
    };

    /**
     * @api {post} /group/:id/makeDeposit makeDeposit
     * @apiName makeDeposit
     * @apiGroup Group
     * @apiParam {String} id Groups unique ID
     * @apiParam {String} userID The Users ID
     * @apiParam {Number} amount Amount in EUR Cent
     * @apiParam {String} [usage] Optional Note
     * @apiParamExample {json} Request-Example:
     *        {
     * 			"biller" : "1",
     * 		   "amount" : 2085,
     * 		 }
     */
    private makeDeposit(req: Request, res: Response, next: NextFunction){
        let groupId = req.params.id;
        let data = req.body;
        GroupController.addDeposit(groupId, data).then(function(result){
            return res.status(200).json({success: true, group: result});
        }).catch( function (err) {
            return res.status(500).json({success: false, error: err});
        });
    }

    private init(){
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

    private extractUser (req: Request, res: Response, next: NextFunction) {
        console.log(req.body.auth.user.user.id);
        User.findOne({externalId: req.body.auth.user.user.id}, function(err, user){
            if(err) next(err);
            if(!user) next(new Error("No User found!"));
            req.body.user = user;
            next();
        });
    }
}

export default new GroupRouter().router;