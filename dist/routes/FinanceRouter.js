"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by nkrei001 on 01.07.17.
 */
const express_1 = require("express");
const FinanceController_1 = require("../controller/FinanceController");
class FinanceRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * @api {get} /finance/group/:id getGroupSaldo
     * @apiName getGroupSaldo
     * @apiGroup Finance
     * @apiDescription Returns Group saldo
     * @apiParam {Number} id Groups unique ID
     *
     * @apiError GroupNotFound The id of the Group was not found
     */
    getGroupSaldo(req, res, next) {
        //TODO check permission
        let id = req.params.id;
        FinanceController_1.FinanceController.getSaldoByGroup(id).then(function (result) {
            return res.status(200).json({ success: true, saldo: result });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
        });
    }
    /**
     * @api {get} /finance/user/:id getUserSaldo
     * @apiName getUserSaldo
     * @apiGroup Finance
     * @apiDescription Returns User saldo
     * @apiParam {Number} id Users unique ID
     *
     * @apiError UserNotFound The id of the Group was not found
     */
    getUserSaldo(req, res, next) {
        let groupId = req.params.groupId;
        let userId = req.params.userId;
        FinanceController_1.FinanceController.getSaldoByUser(groupId, userId).then(function (result) {
            return res.status(200).json({ success: true, saldo: result });
        }).catch(function (err) {
            return res.status(500).json({ success: false, error: err });
        });
    }
    init() {
        this.router.get('/group/:id', this.getGroupSaldo);
        this.router.get('/:groupId/:userId', this.getUserSaldo);
    }
}
exports.FinanceRouter = FinanceRouter;
exports.default = new FinanceRouter().router;
