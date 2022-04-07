import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../providers/AuthProvider'
import {useAlert} from '../../providers/AlertProvider'
import Header from '../subComponant/Header'
const LoginView = ({navigation}) => {

  const {Login} = useAuth();
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [isSecureEntry,setIsSecureEntry] = useState(true);
  const [icon , setIcon] = useState("eye-off")
  const {willAlert} = useAlert();
  
    
    return (
      <View style={styles.container}>

        <Header
                navigation={navigation}
                title = {'เข้าสู่ระบบ'}
                color = {'white'}
                textColor = {'black'}
                goTo = {'Map'}
        />

        <View>
          <Image
            style = {{width :100 , height : 100 ,marginBottom : 20,  marginTop:40}}
            source = {require('../../assets/login/man.png')}></Image>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Username / Phone"
              placeholderTextColor='silver'
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={setUsername}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              placeholderTextColor='silver'
              secureTextEntry={isSecureEntry}
              underlineColorAndroid='transparent'
              onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => {(isSecureEntry) ? setIcon("eye") : setIcon("eye-off"); setIsSecureEntry(!isSecureEntry);}}><Icon style ={{right : 20}} name = {icon} size = {20}/></TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonContainer}>
            <Text style = {{color : '#1134A6',marginLeft:120}}>ลืมรหัสผ่านใช่ไหม ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} 
          onPress={async () => {
              Login(username,password,"member")
              .then(() => navigation.navigate('Map'))
              .catch(err => willAlert('เกิดปัญหาขึ้น',err.response.data.message))
              }
            }>
          <Text style={styles.loginText}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>

        <View 
          style = {{
            alignItems : 'stretch',
            marginVertical :10,
            flexDirection : 'row'
        }}
        >
          <Text style = {{color : '#000000'}}>หากยังไม่มีบัญชี</Text>
          <TouchableOpacity style = {{marginLeft:10}} onPress={ () => navigation.navigate('MemberRegis')}>
            <Text style = {{color : '#1134A6',fontWeight :'bold'}}>สมัครใช้งาน</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#66FFCC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:5,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      color: 'black',
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:5,
  },
  loginButton: {
    backgroundColor: "#6699FF",
  },
  loginText: {
    color: 'white',
  },
  topView:{
    width: '100%', 
    height: 60, 
    backgroundColor : '#FFFFFF',
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    top: 0
  },
  topMenu :
  {
    flexDirection : 'row',
    fontSize : 20,
    alignItems : 'center',
    flex : 1,
    justifyContent : 'center',
    alignContent : 'center',
    position : 'absolute',
    fontWeight : 'bold'
  },
  IconMenu : {
    right : 165
  }
});

export default LoginView;