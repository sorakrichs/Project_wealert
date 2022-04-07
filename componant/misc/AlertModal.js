import React, { useState } from "react";
import { Button, Text, View, StyleSheet,Dimensions,TouchableOpacity } from "react-native";
import Modal from "react-native-modal";




const AlertModal = ({ open, onClose, title='', desc='',type,ok=null,param}) => {


  const acceptFunction = async () => {

    if(ok)
    {
      if (!!ok && typeof ok.then === 'function') {
          const func = await ok;
          await func.apply(this,param || [])
      } else {
        ok.apply(this,param || []);
      }
    }

    onClose();

  }


  return (
      <Modal style={styles.centeredView} isVisible={open} onBackButtonPress={onClose} onBackdropPress={onClose}>
        { type == 'normal' ?
        <View style= {styles.modalView1}>
          <Text style= {styles.titleText}>{title}</Text>
          <Text style= {styles.descText}>{desc}</Text>
          <TouchableOpacity style={[styles.button,{marginTop:20,backgroundColor: 'lightblue'}]} onPress = {acceptFunction}>
            <Text style={{fontSize:18}}>ตกลง</Text>
          </TouchableOpacity>
        </View> : 
        type == 'ask' ?
        <View style= {styles.modalView2}>
          <Text style= {styles.titleText}>{title}</Text>
          <Text style= {styles.descText}>{desc}</Text>
          <TouchableOpacity style={[styles.button,{marginTop:30,backgroundColor: 'lightblue'}]} onPress = {acceptFunction}>
            <Text style={{fontSize:18}}>ตกลง</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{marginTop:10,backgroundColor: 'indianred'}]} onPress = {onClose}>
            <Text style={{fontSize:18}}>ยกเลิก</Text>
          </TouchableOpacity>
        </View> : 
        type == 'gosee' ?
        <View style= {styles.modalView2}>
          <Text style= {styles.titleText}>{title}</Text>
          <Text style= {styles.descText}>{desc}</Text>
          <TouchableOpacity style={[styles.button,{marginTop:30,backgroundColor: 'lightblue'}]} onPress = {acceptFunction}>
            <Text style={{fontSize:18}}>ไปดู</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{marginTop:10,backgroundColor: 'indianred'}]} onPress = {onClose}>
            <Text style={{fontSize:18}}>ไว้ทีหลัง</Text>
          </TouchableOpacity>
        </View> :
        <View style= {styles.modalView2}>
          <Text style= {styles.titleText}>{title}</Text>
          <Text style= {styles.descText}>{desc}</Text>
          <View style={{alignItems:"center"}}>
            <Text style= {[styles.descText,{fontWeight:"bold",marginTop:5}]}>ผู้แจ้ง</Text>
            <Text style= {styles.descText}> Username: {param[2]?.username}</Text>
            <Text style= {styles.descText}> Phone: {param[2]?.phone}</Text>
          </View>
          <TouchableOpacity style={[styles.button,{marginTop:30,backgroundColor: 'lightblue'}]} onPress = {acceptFunction}>
            <Text style={{fontSize:18}}>รับเรื่อง</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{marginTop:10,backgroundColor: 'indianred'}]} onPress = {onClose}>
            <Text style={{fontSize:18}}>ไม่รับเรื่อง</Text>
          </TouchableOpacity>
        </View>
        }
      </Modal>
    )
}

export default AlertModal;

const styles = StyleSheet.create({
    modalView1: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalView2: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 4
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
  },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        top: 0, left: 0, right: 0, bottom: 0,
        position: 'absolute'
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      color: 'dimgray'
    },
    descText: {
      fontSize: 16,
      color: 'dimgray'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        paddingLeft:50,
        paddingRight:50
    }
})