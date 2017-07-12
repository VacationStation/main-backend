"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by nkrei001 on 01.07.17.
 */
const Config_1 = require("../config/Config");
const request = require("request");
var mongoose = require('mongoose');
const IMAGE_ENDPOINT = "/api/img";
class ImageController {
    constructor() {
        this.init();
    }
    init() {
        this.serviceUrl = Config_1.Config.imgServiceUrl;
    }
    getImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getRawImage(id);
            return new Promise((reject, resolve) => {
                // MongoDB Call
                //FIXME
                resolve({ base64Image: data });
            });
        });
    }
    addImage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.serviceUrl + IMAGE_ENDPOINT;
            return new Promise((reject, resolve) => {
                request.post(url, { json: { data: data } }, function (err, res, body) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(JSON.parse(body.id));
                    }
                });
            });
        });
    }
    /**
     * get image meta data from db
     * @param id
     */
    getImageData(id) {
    }
    /**
     * call image WS and get base64 img data
     * @param id
     */
    getRawImage(id) {
        return new Promise((reject, resolve) => {
            let url = this.serviceUrl + IMAGE_ENDPOINT + "/" + id;
            let req = {
                url: url,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            request(req, function (err, res, body) {
                if (err) {
                    reject(new Error("scheise"));
                }
                else {
                    resolve(JSON.parse(body).data);
                }
            });
        });
    }
}
exports.ImageController = ImageController;
exports.default = new ImageController();
