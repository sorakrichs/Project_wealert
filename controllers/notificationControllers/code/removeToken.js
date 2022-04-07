import client from '../../client';

const removeToken = async (id:String) => {

   return await client.get("/member/logout/"+id,{

      timeout: 5000,
      headers: { 

          "Content-Type": "application/json"
      }

   }).then((r) => r).catch((err) => { throw err; });

}  

module.exports = removeToken