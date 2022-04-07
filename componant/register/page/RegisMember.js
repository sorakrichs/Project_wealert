import React, { Component ,useEffect,useState } from 'react';
import {View,StyleSheet,Text,TouchableOpacity,ScrollView,Alert} from 'react-native';

import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Input from './Input'
import validThaiID from 'thai-id-validator';
import { useAlert } from '../../../providers/AlertProvider';
import { useAuth } from '../../../providers/AuthProvider';
const RegisMember = ({navigation}) => {


  const [user , setUser] = useState('');
  const [name , setName] = useState('');
  const [surname , setSurname] = useState('');
  const [confirm , setConfirm] = useState('');
  const [password,setPassword] = useState('');
  const [phone , setPhone] = useState('')
  const [id,setID] = useState('');
  const [email,setEmail] = useState('');
  const [icon , setIcon] = useState("plus-circle")
  const [button , setButton] = useState(false)
  const [address,setAddress] = useState([]);
  const {willAlert} = useAlert();
  const {Register} = useAuth();
  const [isValid,setIsValid] = useState(new Map([[0,false],[1,false],[2,false],[3,false]
    ,[4,false],[5,false],[6,false],[7,false],[8,false],[9,false],[10,false],[11,false]]));

  const [check , setCheck] = useState(false)

  const checkRegis = async () => {

    setButton(true)
    let test = true;
    if(email == '')
    {
      isValid.delete(11);
    }
    isValid.forEach(callback => {
      test = test && callback
    })
    if(!test) {
      willAlert('ใส่ข้อมูลไม่ถูกต้อง','');
    }
    else
    {

      let only_address = address.map( (place) => {
          place.address.name = place.name;
          place.address.location = {
            type:'Point',
            coordinates: [place.address.location.lon,place.address.location.lat]
          }
          return place.address;
        }
      )

      await Register({username: user, password: password, name:name, surname: surname, role:'member', email:email, personalid:id, phone:phone, address: only_address})
      .then(() => {

        willAlert('ลงทะเบียนสำเร็จ','');
        navigation.navigate('Map');

      })
      .catch(err => {  willAlert('เกิดข้อผิดพลาด',err.message);});

      
    }
  
  }

    return (
      <View style={styles.container}>
        <View style = {styles.header}>
          <Text style = {styles.headerText}>ลงทะเบียนสมาชิก</Text>
        </View>
        <ScrollView>
          <Text style = {styles.topic}>ชื่อบัญชี</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="Username"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                pattern = '\S'
                onValidation = {isValids => {setIsValid(prev => prev.set(0,isValids))}}
                onChangeText = {user => setUser(user)}
            />
          </View>
          <View>
            { !isValid.get(0) && button ? <Text style = {styles.errorText}>
              ต้องกรอก Username
            </Text> : null}
          </View>

          <Text style = {styles.topic}>รหัส</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="Password"
                keyboardType="default"
                pattern= {[ 
                  `\\S`,
                  '^.{8,}$', // min 8 chars
                  '(?=.*\\d)', // number required
                  '(?=.*[A-Z])', // uppercase letter
                ]}
                underlineColorAndroid='transparent'
                onValidation = {(checkValid) => checkValid.map( (number,index) => {
                  setIsValid(isValid.set(index+1,number));
                })}
                onChangeText = {password => setPassword(password)}
            />
          </View>
          
          <BoxPasswordStrengthDisplay
            password={password}
            variations = {{
              digits: /\d[2]/,
              lower: /[a-z][2]/,
              upper: /[A-Z][2]/,
              nonWords: /\W[2]/,
            }}
            minLength = {8}
            levels = {[
              {
                label: 'Weak',
                labelColor: '#ff6900',
                activeBarColor: '#ff6900',
              },
              {
                label: 'Average',
                labelColor: '#f3d331',
                activeBarColor: '#f3d331',
              },
              {
                label: 'Strong',
                labelColor: '#14eb6e',
                activeBarColor: '#14eb6e',
              },
              {
                label: 'Very Strong',
                labelColor: '#00ff6b',
                activeBarColor: '#00ff6b',
              }
            ]}
          />
          <View>
            { !isValid.get(1) && button ? <Text style = {styles.errorText}>
              Password ต้องกรอกข้อมูล
            </Text> : null}
          </View>
          <View>
            { !isValid.get(2) && button ? <Text style = {styles.errorText}>
              Password ต้องมีอย่างน้อย 8 ตัวอักษร
            </Text> : null}
          </View>
          <View>
            { !isValid.get(3) && button ? <Text style = {styles.errorText}>
              Password ต้องมีตัวเลข
            </Text> : null}
          </View>
          <View>
            { !isValid.get(4) && button ? <Text style = {styles.errorText}>
              Password ต้องมีอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว
            </Text> : null}
          </View>

          <Text style = {[styles.topic,{marginTop :15}]}>ยืนยันรหัส</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="Confirm Password"
                keyboardType="default"
                underlineColorAndroid='transparent'
                pattern= {
                  password
                }
                onValidation = {isValids => {setIsValid(prev => prev.set(5,isValids))}}
                onChangeText = {confirm => setConfirm(confirm)}
                checkCase = 'confirm'
            />
          </View>

          <View>
            { !isValid.get(5) && button ? <Text style = {styles.errorText}>
              Password ไม่ตรงกับที่กรอกเอาไว้
            </Text> : null}
          </View>
          
          <Text style = {styles.topic}>ชื่อจริง</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="ชื่อจริง"
                keyboardType="default"
                underlineColorAndroid='transparent'
                pattern = '\S'
                onValidation = {isValids => {setIsValid(prev => prev.set(6,isValids))}}
                onChangeText = {name => setName(name)}
            />
          </View>
          <View>
            { !isValid.get(6) && button ? <Text style = {styles.errorText}>
              ชื่อจริง เป็นข้อมูลที่ต้องกรอก
            </Text> : null}
          </View>

          <Text style = {styles.topic}>นามสกุล</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="นามสกุล"
                keyboardType="default"
                underlineColorAndroid='transparent'
                pattern = '\S'
                onValidation = {isValids => {setIsValid(prev => prev.set(7,isValids))}}
                onChangeText = {surname => setSurname(surname)}
            />
          </View>
          <View>
            { !isValid.get(7) && button ? <Text style = {styles.errorText}>
              นามสกุล เป็นข้อมูลที่ต้องกรอก
            </Text> : null}
          </View>

          <Text style = {styles.topic}>รหัสบัตรประชาชน</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="รหัสบัตรประชาชน"
                keyboardType="decimal-pad"
                underlineColorAndroid='transparent'    
                onValidation = {isValids => {setIsValid(prev => prev.set(8,isValids))}}
                onChangeText = {id => setID(id)}
                checkCase = 'id'
            />
          </View>
          <View>
            { !isValid.get(8) && button ? <Text style = {styles.errorText}>
              รูปแบบบัตรประชาชนผิด
            </Text> : null}
          </View>
          
          <Text style = {styles.topic}>หมายเลขโทรศัพท์</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="หมายเลขโทรศัพท์"
                keyboardType="decimal-pad"
                underlineColorAndroid='transparent'
                pattern= {[
                  '^[0-9]{10}$',
                  '^(0[689]{1})+([0-9]{8})+$',
                ]}
                onValidation = {(checkValid) => checkValid.map( (number,index) => {
                  setIsValid(isValid.set(index+9,number));
                })}
                onChangeText = {phone => setPhone(phone)}
            />
          </View>
          <View>
            { !isValid.get(9) && button ? <Text style = {styles.errorText}>
              หมายเลขโทรศัพท์ไม่ครบ 10 ตัว
            </Text> : null}
          </View>
          <View>
            { !isValid.get(10) && button ? <Text style = {styles.errorText}>
              หมายเลขโทรศัพท์ผิดรูปแบบในประเทศไทย
            </Text> : null}
          </View>
          
          <Text style = {styles.topic}>อีเมล</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="Email (ถ้ามี)"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                pattern = '^\S+@\S+\.\S+'
                onValidation = {isValids => {setIsValid(prev => prev.set(11,isValids))}}
                onChangeText = {Email => setEmail(Email)}
            />
          </View>
          <View>
            { !isValid.get(11) && button && email ? <Text style = {styles.errorText}>
              ผิดรูปแบบ Email
            </Text> : null}
          </View>

          <TouchableOpacity style={[styles.addressButtonContainer, styles.AddressButton]}
            onPress={() => navigation.navigate('RegisHome',{address:address,setAddress: setAddress})}>
            <Icon name='map' size={25} style={{marginRight:20}} color={'lightgreen'}/>
            <Text style={styles.AddressText}>เพิ่มที่อยู่</Text>
          </TouchableOpacity>


          <TouchableOpacity style={[styles.buttonContainer, styles.RegisterButton]}
            onPress = {() => checkRegis()}>
            <Text style={styles.RegisText}>ยืนยันการลงทะเบียน</Text>
          </TouchableOpacity>


          <TouchableOpacity style={[styles.buttonContainer, styles.backtologinButton]}
          onPress={() => navigation.navigate('Login')} >
            <Text style={styles.RegisText}>กลับไปหน้าเข้าสู่ระบบ</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66FFCC',
  },
  header : {
    height : 60,
    padding : 15,
    marginBottom:10,
    backgroundColor : 'darkcyan'
  },
  headerText : {
    color : '#fff',
    fontSize : 24,
    textAlign : 'center',
    fontWeight: 'bold'
  },
  inputContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius:5,
      width: "80%",
      borderBottomWidth: 1,
      height:45,
      marginBottom:10,
      alignSelf:'center'
  },
  inputs:{
    paddingLeft:10,
    paddingRight:10,
    height:45,
    borderBottomColor: '#FFFFFF',
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  addressButtonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:'80%',
    borderRadius:5,
    alignSelf:'center'
  },
  buttonContainer: {
    height:60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:5,
    alignSelf:'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  RegisterButton: {
    backgroundColor: "#6699FF",
  },
  AddressButton: {
    backgroundColor: "green",
  },
  backtologinButton: {
    backgroundColor: "red",
  },
  AddressText: {
    color: 'white',
    fontSize: 18
  },
  RegisText: {
    color: 'white',
    fontSize: 20
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign:'center',
    marginBottom : 10
  },
  logo : {
    fontWeight : 'bold',
    fontSize :25,
    color : '#000000',
    marginBottom : 40,
    marginTop : 20
  },
  topic : {
    left : 45,
    fontSize : 15,
    marginTop :10,
    marginBottom :5,
    fontWeight:'bold',
    color: 'dimgray'
  }
});

export default RegisMember;