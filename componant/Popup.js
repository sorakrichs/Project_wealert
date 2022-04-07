
import React,{useState,useMemo} from 'react'
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
    ScrollView,
    Image,
    Linking,
    Platform
    } from 'react-native';
import Modal from "react-native-modal";
import {useMap} from '../providers/MapProvider'
import {date,reportStatus} from '../controllers/miscControllers'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import ImageCollection from './popup/popupImageCollection';
const HomePopup = ({open,onClose,id,navigation}) => {

    const {getAddressData,setFocus,tracking,trackingVolunteer} = useMap();
    const [page,setPage] = useState('');

    const address = useMemo(() => {
        return getAddressData(id);
    }, [id]);

    const onPressMobileNumberClick = (number) => {

        let phoneNumber = '';
        if (Platform.OS === 'android') {
          phoneNumber = `tel:${number}`;
        } else {
          phoneNumber = `telprompt:${number}`;
        }
  
        Linking.openURL(phoneNumber);
     }


    const ValidateModal = () => {

        return(
            <View style= {styles.validateReportModal}>
                <View style = {styles?.section}>
                { (address?.type == 'car') ? 
                    <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                        <Entypo name='location-pin' size={20} color='black'/>
                        <Text style={styles.topicText}>อุบัติเหตุทางจราจร </Text> 
                    </View> :
                    (address?.type == 'fire') ? 
                    <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                        <Entypo name='location-pin' size={20} color='red'/>
                        <Text style={styles.topicText}>ไฟไหม้ </Text> 
                    </View> :
                    (address?.type == 'epidemic') ? 
                    <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                        <Entypo name='location-pin' size={20} color='green'/>
                        <Text style={styles.topicText}>โรคระบาด </Text> 
                    </View> :
                    <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                        <Entypo name='location-pin' size={20} color='blue'/>
                        <Text style={styles.topicText}>น้ำท่วม</Text> 
                    </View>
                }
                </View> 
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> รายระเอียด </Text>
                        <Text style={styles.textStyle}>{(address?.description) ? address?.description: 'ไม่ได้ระบุไว้'}</Text>
                    </View>
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> ผู้แจ้ง </Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Image style={styles.avatar} source={ (address?.memberImage) ? {uri: address?.memberImage} : require('../assets/profile/default_user.png')}/>
                            <Text style={styles.textStyle}>{(address?.user?.username)? address?.user?.username: 'ไม่ได้ระบุไว้'}</Text>
                        </View>
                    </View>
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> ผู้รับเรื่อง </Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Image style={styles.avatar} source={ (address?.volunteerImage) ? {uri:address?.volunteerImage} : require('../assets/profile/default_user.png')}/>
                            <Text style={styles.textStyle}> {(address?.volunteer?.username) ? address?.volunteer?.username : 'ไม่มี'} </Text>
                        </View>
                    </View>
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> สถานะ </Text>
                        <Text style={{
                            color: (address?.status == 'inprocess') ? 'darkgoldenrod' : (address?.status == 'finish') ? 'green' : 'red'

                        }}>{reportStatus(address?.status)}</Text>
                    </View>
                <View style = {styles?.section}>
                    <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white',borderTopWidth:1}}>
                        <TouchableOpacity style={styles.validatebtn} onPress={() => { onClose(); navigation.navigate('ViewReport',{address})}}>
                            <Text style={{fontWeight:'bold'}} >รายระเอียดเพิ่มเติม</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


    return (
        <View>
        { address?.type && 
        <Modal style={styles.centeredView} isVisible={open} onBackButtonPress={onClose} onBackdropPress={onClose} backdropOpacity={0}>
            {address?.type == 'home'?
                <View style= {[styles.modalView,{paddingVertical:30}]}>
                    <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1 , marginBottom:10,paddingHorizontal:50}}>
                        <Ionicons color='dimgray' name='home' size={20}/>
                        <Text style={styles.topicText}> บ้าน </Text>
                    </View>
                    <View style = {styles?.section}>
                        <View style = {{flexDirection:'row'}}>
                            <Text style={styles.textStyle}>{address?.subdistrict} </Text>
                            <Text style={styles.textStyle}>{address?.district} </Text>
                        </View>
                        <View style = {{flexDirection:'row'}}>
                            <Text style={styles.textStyle}>{address?.province}</Text>
                        </View>
                        <View style = {{flexDirection:'row'}}>
                            <Text style={styles.textStyle}>{address?.postcode}</Text>
                        </View>
                    </View>
                </View> : 

            address?.type == 'mypin' ?
                (page == 'image' ? 
                    <ImageCollection images={address.images} onClose={()=>setPage('')}/> :
                    <View style= {styles.modalView}>
                        <View style = {styles?.section}>
                            <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1 , marginBottom:10}}>
                                <Entypo color='dimgray' name='location-pin' size={25}/>
                                <Text style={styles.topicText}> หมุดของฉัน </Text>
                            </View>
                        </View>
                        <View style = {styles?.section}>
                            <Text style={styles.sectionText}> สถานที่เกิดเหตุ </Text>
                            <View style = {{flexDirection:'row'}}>
                                <Text style={styles.textStyle}>{address.subdistrict}  </Text>
                                <Text style={styles.textStyle}>{address.district}</Text>
                            </View>
                            <View style = {{flexDirection:'row'}}>
                                <Text style={styles.textStyle}>{address.province}  </Text>
                                <Text style={styles.textStyle}>{address.postcode}</Text>
                            </View>
                        </View>
                        <View style = {{alignItems:'center',margin:10}}>
                            <Text style={styles.sectionText}> รายระเอียด </Text>
                            <Text style={styles.textStyle}>{(address.description) ? address.description: 'ไม่ได้ระบุไว้'}</Text>
                        </View>

                        <View style = {styles?.section}>
                            <Text style={styles.sectionText}> วันหมดอายุ </Text>
                            <Text style={styles.textStyle}>{date.getDay(address?.date)}</Text>
                            <Text style={styles.textStyle}>{date.getTime(address?.date)}</Text>
                        </View>
                        {address?.volunteer && <View style = {styles?.section}>
                            <Text style={styles.sectionText}> ผู้รับเรื่อง </Text>
                            <Text style={styles.textStyle}>{address?.volunteer?.name}</Text>
                            <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                            <TouchableOpacity style={{backgroundColor:'lime',borderRadius:100,borderWidth:2,padding:5,borderColor:'green',margin:5}}
                                onPress={() => onPressMobileNumberClick(address?.volunteer?.phone)}>
                                <Entypo name='phone' size={30}/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={{backgroundColor:(tracking) ? 'purple':'magenta' ,borderRadius:100,borderWidth:2,padding:5,margin:5,borderColor:(tracking) ? 'magenta':'purple'}}
                                onPress={async () =>{await trackingVolunteer(address?.volunteer); onClose();}}>
                                <Entypo name='pin' size={30}/>
                            </TouchableOpacity>
                            </View>
                        </View>}
                        <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                            <TouchableOpacity style={[styles.validatebtn, styles.buttonOpen, {flexDirection:'row',alignItems:'center',justifyContent:'center'}]} 
                                onPress={()=> { setPage('image')} } >
                                    <Entypo name='image' size={25} style={{paddingRight:5}}/>
                                    <Text style={{fontWeight:'bold'}} >รูปภาพ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>) :

            address?.type == 'report' ?
                (page == 'image' ? 
                <ImageCollection images={address.images} onClose={()=>setPage('')}/> :
                <View style= {styles.modalView}>
                    <View style = {styles?.section}>
                        <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                            <Entypo color='dimgray' name='location-pin' size={20}/>
                            <Text style={styles.topicText}> หมุดที่ยังไม่ได้ตรวจสอบ </Text>
                        </View>
                    </View> 
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> ผู้แจ้ง </Text>
                        <Text style={styles.textStyle}>Username: {(address?.reportUser?.username)? address?.reportUser?.username: 'ไม่ได้ระบุไว้'}</Text>
                        <Text style={styles.textStyle}>หมายเลขโทรศัพท์: {(address?.reportUser?.phone)? address?.reportUser?.phone: 'ไม่ได้ระบุไว้'}</Text>
                        <TouchableOpacity style={{backgroundColor:'lime',borderRadius:100,borderWidth:2,padding:5,borderColor:'green'}}
                            onPress={() => onPressMobileNumberClick(address?.reportUser?.phone)}>
                            <Entypo name='phone' size={30}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> สถานที่เกิดเหตุ </Text>
                        <View style = {{flexDirection:'row'}}>
                            <Text style={styles.textStyle}>{address?.subdistrict}  </Text>
                            <Text style={styles.textStyle}>{address?.district}</Text>
                        </View>
                        <View style = {{flexDirection:'row'}}>
                            <Text style={styles.textStyle}>{address?.province}  </Text>
                            <Text style={styles.textStyle}>{address?.postcode}</Text>
                        </View>
                    </View>
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> รายระเอียดเพิ่มเติม </Text>
                        <Text style={styles.textStyle}>{(address?.description) ? address?.description: 'ไม่ได้ระบุไว้'}</Text>
                    </View>


                    <View style = {[styles?.section,{borderTopWidth:1}]}>
                        <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                            <TouchableOpacity style={[styles.validatebtn, styles.buttonOpen, {flexDirection:'row',alignItems:'center',justifyContent:'center'}]} 
                            onPress={()=> { setPage('image')} } >
                                <Entypo name='image' size={25} style={{paddingRight:5}}/>
                                <Text style={{fontWeight:'bold'}} >รูปภาพ</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.validatebtn, {flexDirection:'row',backgroundColor: 'aquamarine',alignItems:'center',justifyContent:'center'}]} 
                            onPress={() => { onClose(); setFocus(id);}} >
                                <Entypo name='location-pin' size={25}/>
                                <Text style={{fontWeight:'bold'}} >ติดตาม</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                            <TouchableOpacity style={[styles.validatebtn, {flexDirection:'row',backgroundColor : 'springgreen',alignItems:'center',justifyContent:'center'}]}  
                            onPress={() => { onClose(); navigation.navigate('ValidateReport',{address})}}>
                                <Entypo name='check' size={25}/>
                                <Text style={{fontWeight:'bold'}} >ยืนยันความถูกต้อง</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                            <TouchableOpacity style={[styles.validatebtn, {flexDirection:'row',backgroundColor : 'red',alignItems:'center',justifyContent:'center'}]}  
                            onPress={() => { onClose(); navigation.navigate('ValidateReport',{address})}}>
                                <Entypo name='cross' size={25}/>
                                <Text style={{fontWeight:'bold'}} >ข้อมูลไม่เป็นจริง</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>) :
            address?.type == 'you' ?
                <View style= {styles.modalView}>
                    <Text style={styles.textStyle}>คุณไง</Text> 
                </View> : 
            address?.type == 'volunteer' ?
                <View style= {styles.modalView}>
                    <Text style={styles.textStyle}>อาสาสมัครไง</Text> 
                </View> :
            (page == 'image' ? <ImageCollection images={address.images} onClose={()=>setPage('')}/> : <ValidateModal/>)}
        </Modal> }
        </View>);

}

export default HomePopup;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
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
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: "center",
    }, 
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "lightblue",
    },
    buttonClose: {
        backgroundColor: "pink",
    },
    textStyle: {
        color: "black",
    },
    modalText: {
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 20,
        textAlign: "center"
    },
    validateReportModal: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingLeft:20,
        paddingRight:20,
        alignItems: "center",
    },
    section: {
        margin: 10,
        alignItems: 'center'
    },
    validatebtn : {
        padding : 10 ,
        flex: 0.75,
        margin : 10,
        alignItems:'center',
        borderRadius:10,
        backgroundColor : 'springgreen'
    },
    avatar: {
        paddingTop: 20,
        height: 30,
        width: 30,
        borderRadius: 100,
        padding: 20,
    },
    sectionText: {
        fontWeight:'bold', 
        fontSize:16,
        color:'dimgray'
    },
    topicText: {
        fontWeight:'bold', 
        fontSize:20,
        bottom:1,
        color:'dimgray'
    }
});