
/**
 * Created by nkrei001 on 01.07.17.
 */

import {User, IUserModel} from "../models/User";
import {Group, IGroupModel} from "../models/Group";


export class UserController{

    /**
     * get User by Id
     * @param id
     * @returns {any}
     */
   public static getById(id) : Promise<IUserModel> {

       return new Promise<IUserModel> ((resolve, reject) => {
            User.findById(id)
                .then((user : IUserModel) => resolve(user))
                .catch(err => reject(err));
       });
    }

    /**
     * adds new user
     * @param user
     */
    public static createUser(data) : Promise<IUserModel[]>{
        data.externalId = data.id;
        return User.create(data);
    }

    /**
     * deletes an user
     * @param id
     */
    public static delUser(id) : Promise<any>{
        //TODO check permission
        return new Promise<any> ((resolve, reject) => {
            User.findByIdAndRemove(id)
                .then((result : any) => resolve(result))
                .catch(err => reject(err));
        });

    }

    public static getGroupsByUser(id) : Promise<Array<IGroupModel>> {


        return new Promise<Array<IGroupModel>>((resolve, reject) => {
                Group.find(
                    {"member" : id }
                )
            })
    }
}

export default new UserController();