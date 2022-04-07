
import client from '../../client';
import FormData from 'form-data'

const imageUploadController = async (images: Array<Object>) => {



        const data = new FormData();
        images.map( (image) => {

            data.append('files',{
                name: image.path.split('/').pop(),
                type: image.mime,
                uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', '')
            })
            
        })

        //data.append('files',JSON.stringify(imagedata));
        /*data.append('files', {


            name: image.path.split('/').pop(),
            type: image.mime,
            uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', '')


      
        });*/

        await client.post("/upload",data, {
            headers: { 
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            console.log(res)
            return res;
        }).catch((err) => {
            
            throw err;
        });
}

module.exports = imageUploadController;