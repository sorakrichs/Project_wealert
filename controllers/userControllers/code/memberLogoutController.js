import client from '../../client';
import {removeSession} from '../../storageControllers'
import { removeToken } from '../../notificationControllers';

const memberLogoutController = async (id:String) => {
 
    try {
        
        await removeToken(id);
        await removeSession();

    } catch (err) {
        throw err;
    }

}

module.exports = memberLogoutController;