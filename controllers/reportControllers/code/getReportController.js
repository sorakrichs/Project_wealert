import client from '../../client';

const getReportController = async (location:{lon:Number,lat:Number}) => {
    
    
    try {

        let data = {
            location : location,
            range: 10
        }

        let res = await client.post("/report/getReportInRange",data, {
            timeout: 5000,
            headers: { 
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});


        return res.data;
       
        
    } catch (err) {

        throw err;
        
    }


}

module.exports = getReportController;