import client from '../../client';
import {sessionStorage} from '../../storageControllers'

const updateAddressController = async (id:String, data :Object) => {

    if(typeof data != 'object') {throw new Error('updateAddressController: data must be object') }
    else {


        let res = await client.get("/member/address/"+id, {
            timeout:5000,
            headers: { 
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});

        return res;
        
    }

}

    

module.exports = updateAddressController;