import AsyncStorage from '@react-native-async-storage/async-storage';


const pinStorageController = async (data: Map,session_id: String) => {
  try {

    const jsonValue = JSON.stringify([...data]);
    if(session_id)
      await AsyncStorage.setItem(`@pin/${session_id}`, jsonValue);
    else
      await AsyncStorage.setItem(`@pin/guest`, jsonValue);

  } catch (err) {

    throw err

  }

}

module.exports = pinStorageController;