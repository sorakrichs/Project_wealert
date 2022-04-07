import client from '../../client';

const getUserDataController = async (id: String) => {
    
    try {
        if(typeof id != 'string') {throw new Error('getUserDataController: id must be String') }
        else {
            
            let res = await client.get("/member/profile/"+id, {
                timeout: 5000,
                headers: { 
                    "Content-Type": "application/json"
                }
            

            }).then((r) => r).catch((err) => {throw err;});

            return res.data;
        }

    } catch (err) {

        throw err;

    }

}

module.exports = getUserDataController;