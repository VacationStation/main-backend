"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by nkrei001 on 01.07.17.
 */
const express_1 = require("express");
const ImageController_1 = require("../controller/ImageController");
class ImageRouter {
    constructor() {
        this.router = express_1.Router();
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
    getImage(req, res, next) {
        //TODO get image data from Groups where image ID = id
        let imgId = parseInt(req.params.id);
        ImageController_1.default.getImage(imgId)
            .then(function (value) {
            console.log(value);
            return res.status(200).json({ success: true, value });
        }, function (reason) {
            return res.status(500).json({ success: false, error: reason });
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
    addImage(req, res, next) {
        let data = req.body.image;
        ImageController_1.default.addImage(data)
            .then(function (value) {
            return res.status(200).json({ success: true, imgId: value });
        }, function (reason) {
            return res.status(500).json({ success: false, error: reason });
        });
    }
    init() {
        this.router.get('/:id', this.getImage);
        this.router.post('/', this.addImage);
    }
}
exports.ImageRouter = ImageRouter;
exports.default = new ImageRouter().router;
