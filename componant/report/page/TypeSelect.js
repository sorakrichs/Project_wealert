import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    SafeAreaView,
    Button,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert
    } from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
const TypeSelect = ({type}) => {
    return (
        <View style={styles.modalView}>
            <Text style={styles.modalText}>ประเภท</Text>
            <View>
                <TouchableOpacity style={[styles.carButton,styles.button]} onPress={() => type('รถชน','black')}>
                    <Icon name="car" size={60} color="white"/>
                    <Text style={styles.buttonText}>รถชน</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.fireButton,styles.button]} onPress={() => type('ไฟไหม้','red')}>
                    <Icon name="fire" size={60} color="white"/>
                    <Text style={styles.buttonText}>ไฟไหม้</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default TypeSelect;

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4
        },
        width: (Dimensions.get('window').width) *0.8,
        height: (Dimensions.get('window').height) *0.8,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 20,
        textAlign: "center"
    },
    buttonText:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
        marginTop: 5
    },
    button:{
        width: 100,
        height: 100,
        marginBottom: 20,
        borderWidth: 5
    },
    carButton: {
        alignItems: 'center',
        backgroundColor: 'gray',
        borderColor: 'black'
    },
    fireButton: {
        alignItems: 'center',
        backgroundColor: 'red',
        borderColor: 'orange'
    }
})