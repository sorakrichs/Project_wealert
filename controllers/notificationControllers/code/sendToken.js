import client from '../../client';

const sendToken = async (data) => {

   let res_data = await client.post("/setFCMToken",data, {

      timeout: 500,
      headers: { 

          "Content-Type": "application/json"
      }

   }).then((r) => r).catch((err) => { throw err; });

}  

module.exports = sendToken