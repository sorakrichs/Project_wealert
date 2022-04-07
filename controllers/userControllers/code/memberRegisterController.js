import client from '../../client';
import {sessionStorage} from '../../storageControllers'

const memberRegisterController = async (data : {
    username:String,
    password:String,
    name:String,
    surname:String,
    role:'member',
    email:String,
    personalid:String,
    phone:String,
    address: Array<Object>
    }) => {

    if(typeof data != 'object') {throw new Error('memberRegisterController: data must be Object') }
    else if(typeof data.username != 'string') {throw new Error('memberRegisterController: data.username must be String') }
    else if(typeof data.password != 'string') {throw new Error('memberRegisterController: data.password must be String') }
    else if(typeof data.name != 'string') {throw new Error('memberRegisterController: data.name must be String') }
    else if(typeof data.surname != 'string') {throw new Error('memberRegisterController: data.surname must be String') }
    else if(typeof data.email != 'string' && data.email != null) {throw new Error('memberRegisterController: data.email must be String or Null') }
    else if(typeof data.personalid != 'string') {throw new Error('memberRegisterController: data.personalId must be String') }
    else if(typeof data.phone != 'string') {throw new Error('memberRegisterController: data.phone must be String') }
    else {

        let res = await client.post("/member/register",data, {
            timeout:5000,
            headers: { 
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});

        return res;
        
    }

}

module.exports = memberRegisterController;