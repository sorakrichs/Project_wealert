import client from '../../client';
import {sessionStorage} from '../../storageControllers'

const memberLoginController = async (data : {
    usernameorphone : String,
    password : String
    }) => {
    const jwtDecode = require('jwt-decode');

    if(typeof data != 'object') {throw new Error('memberLogin: data must be Object') }
    else if(typeof data.usernameorphone != 'string') {throw new Error('memberLogin: data.username must be String') }
    else if(typeof data.password != 'string') {throw new Error('memberLogin: data.password must be String') }
    else {
        
        let res_data = await client.post("/member/login",data, {
            timeout: 5000,
            headers: { 
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});
        
        await sessionStorage(res_data.data).catch((err) => {throw err});
        let decode = await jwtDecode(res_data.data);
        return decode;
    }

}

module.exports = memberLoginController;