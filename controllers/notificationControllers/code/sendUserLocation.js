import { ReactionUserManager } from 'discord.js';
import client from '../../client';

const sendUserLocation = async (id,location) => {

   if(!id || !location) return;

   let res_data = await client.post("/setLocation",{userid: id ,location: location}, {

      timeout: 500,
      headers: { 

          "Content-Type": "application/json"
      }

   }).then((r) => r).catch((err) => {throw err;});

}  

module.exports = sendUserLocation