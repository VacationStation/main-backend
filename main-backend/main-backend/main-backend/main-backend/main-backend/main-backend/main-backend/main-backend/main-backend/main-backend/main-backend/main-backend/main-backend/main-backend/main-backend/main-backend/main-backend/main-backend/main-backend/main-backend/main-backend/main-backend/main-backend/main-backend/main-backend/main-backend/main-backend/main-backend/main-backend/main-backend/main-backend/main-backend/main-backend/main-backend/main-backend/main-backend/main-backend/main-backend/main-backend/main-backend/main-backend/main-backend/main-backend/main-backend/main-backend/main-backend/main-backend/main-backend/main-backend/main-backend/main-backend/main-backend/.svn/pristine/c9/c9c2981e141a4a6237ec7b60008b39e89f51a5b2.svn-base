/**
 * Created by nkrei001 on 01.07.17.
 */
import {Router, Request, Response, NextFunction} from 'express';
import ImageController from '../controller/ImageController';
import GroupController from '../controller/GroupController';

export class ImageRouter{

    public router: Router;

    constructor () {
        this.router = Router();
        this.init();
    }

    /**
     * @api {get} /image/:id getImage
     * @apiName getImage
     * @apiGroup Image
     * @apiDescription Returns Image data
     * @apiParam {String} image Image data as base64 encoded string
     * @apiParam {Object} meta
     * @apiParam {String} meta.description
     *
     * @apiError ImageNotFound The id of the Image was not found
     */
    private getImage(req: Request, res: Response, next: NextFunction){
        //TODO get image data from Groups where image ID = id
        let imgId = parseInt(req.params.id);

        ImageController.getImage(imgId)
            .then(function(value){
                console.log(value);
                return res.status(200).json({success: true, value});
            }, function (reason){
                return res.status(500).json({success: false, error: reason});
            });
    }

    /**
     * @api {post} /image addImage
     * @apiName addImage
     * @apiGroup Image
     * @apiDescription Adds new Image
     * @apiParam {String} image Image data as base64 encoded string
     *
     * @apiSuccess {Number} imageId
     */
    private addImage(req: Request, res: Response, next: NextFunction){
        let data = req.body.image;
        ImageController.addImage(data)
            .then(function(value){
                return res.status(200).json({success: true, imgId: value});
            }, function (reason){
                return res.status(500).json({success: false, error: reason});
            });
    }

    private init(){
        this.router.get('/:id', this.getImage);
        this.router.post('/', this.addImage);
    }
}

export default new ImageRouter().router;
