/**
 * Created by nkrei001 on 01.07.17.
 */
import {Router, Request, Response, NextFunction} from 'express';
import {FinanceController} from "../controller/FinanceController";

export class FinanceRouter{

    public router: Router;

    constructor () {
        this.router = Router();
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
    private getGroupSaldo(req: Request, res: Response, next: NextFunction){
        //TODO check permission
        let id = req.params.id;
        FinanceController.getSaldoByGroup(id).then(function (result){
            return res.status(200).json({success: true, saldo: result});
        }).catch( function (err){
            return res.status(500).json({success: false, error: err});
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
    private getUserSaldo(req: Request, res: Response, next: NextFunction){
        let groupId = req.params.groupId;
        let userId = req.params.userId;

        FinanceController.getSaldoByUser(groupId, userId).then(function (result){
            return res.status(200).json({success: true, saldo : result});
        }).catch( function(err) {
            return res.status(500).json({success: false, error: err});
        });

    }
    private init(){
        this.router.get('/group/:id', this.getGroupSaldo);
        this.router.get('/:groupId/:userId', this.getUserSaldo);
    }
}

export default new FinanceRouter().router;
