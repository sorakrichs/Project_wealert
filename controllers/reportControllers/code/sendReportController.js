import client from '../../client';
import {getToken} from '../../storageControllers'

const sendReportController = async (session:Object, address : Object,images : Array<Object> = null,description: String) => {
    
    
    try {

        let token = await getToken();
        const data = new FormData();

        await Promise.all(
            images.map((image) => {
                data.append('files',{
                    name: image.path.split('/').pop(),
                    type: image.mime,
                    uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', '')
                })
            
            })

        )

        data.append('user',JSON.stringify(session));
        data.append("address",JSON.stringify(address));
        data.append("description",description);
        const config = {
            timeout: 1000,
            headers : {

                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"

            }

        }


        await client.post("/report/send",data,config
        ).then((res) => {
            
            return res;
            
        })
        
    } catch (err) {

        throw err;
        
    }


}

module.exports = sendReportController;