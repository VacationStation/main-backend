/**
 * Created by nkrei001 on 01.07.17.
 */
import {Config} from '../config/Config';
import * as request from 'request';

var mongoose = require('mongoose');

const IMAGE_ENDPOINT = "/api/img";

export class ImageController{

    private serviceUrl: string;
    private mongoUrl: string;

    constructor(){
        this.init();
    }

    private init(){
        this.serviceUrl = Config.imgServiceUrl;
    }

    async getImage(id: number): Promise<any> {
        const data = await this.getRawImage(id);

         return new Promise((reject, resolve) => {
             // MongoDB Call
             //FIXME
            resolve({base64Image: data});
         });
    }

    async addImage(data: any): Promise<any>{
        let url = this.serviceUrl+IMAGE_ENDPOINT;

        return new Promise((reject, resolve) => {
            request.post(url,{json: {data : data}}, function( err, res, body){
                if(err){
                    reject(err);
                }else{
                    resolve(JSON.parse(body.id));
                }
            });
        });
    }

    /**
     * get image meta data from db
     * @param id
     */
    private getImageData(id){

    }

    /**
     * call image WS and get base64 img data
     * @param id
     */
    private getRawImage(id): Promise<any> {
        return new Promise((reject, resolve) => {
            let url = this.serviceUrl+IMAGE_ENDPOINT+"/"+id;
            let req = {
                url: url,
                method : 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                }
            };
            request(req, function(err, res, body){
                if(err){
                    reject(new Error("scheise"));
                } else{
                    resolve(JSON.parse(body).data);
                }
            });
        });



    }
}

export default new ImageController();