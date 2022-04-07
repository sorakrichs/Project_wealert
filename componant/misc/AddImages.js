import React,{useState} from 'react';
import {
  Image, 
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  Modal, 
  View, 
  Text, 
  Pressable,
  Dimensions
  } from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {cameraPermission} from '../../controllers/permissionControllers'
import {pickPicture,useCamera} from '../../controllers/imageControllers'



const AddImage = ({open,onClose,setImages}) => {


  return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.picFolder}>
              <TouchableOpacity
                onPress={() => {pickPicture().then((image) => {setImages(image); onClose();})}}>
                <MaterialCommunityIcons name="folder-image" size={80}/>
              </TouchableOpacity>
              <Text style={styles.textStyle}>ภาพจากโฟลเดอร์</Text>
            </View>
            <View style={styles.picCamera}>
              <TouchableOpacity
                onPress={() => { useCamera().then((image) => {setImages(image); onClose();})}}>
                <MaterialCommunityIcons name="camera" size={80}/>
              </TouchableOpacity>
              <Text style={styles.textStyle}>ภาพจากกล้องถ่ายรูป</Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}
            >
              <MaterialCommunityIcons name="close" size={20}/>
            </Pressable>
          </View>
        </View>
      </Modal>
  );
};

export default AddImage;

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: Dimensions.get('window').height/2,
    width: Dimensions.get('window').width*0.8
  },
  picFolder: {
    position: 'absolute',
    alignItems: "center",
    top: Dimensions.get('window').height/2 * 0.1
  },
  picCamera: {
    position: 'absolute',
    alignItems: "center",
    top: Dimensions.get('window').height/2 * 0.45
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    position: 'absolute',
    backgroundColor: "#FF605C",
    bottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  imageStyle:{

    paddingTop: 20,
    height: 200,
    width: 200,
    borderRadius: 100,
    padding: 20,
 
   }



});