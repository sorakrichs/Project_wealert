
import React,{useState, useMemo} from 'react'
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
    Alert,
    ScrollView
    } from 'react-native';
import Header from '../../subComponant/Header'
import Icon from 'react-native-vector-icons/Ionicons';
import {useReport} from '../../../providers/ReportProvider'
import {useMap} from '../../../providers/MapProvider'
import {useAlert} from '../../../providers/AlertProvider'

const ReportModal = ({navigation}) => {

    const {willAlert} = useAlert();
    const {getLocation,address,send} = useReport();
    useMemo( async () => {

        await getLocation();

    },[])

    
    return (
        <SafeAreaView style={styles.container}>
            <Header
                navigation={navigation}
                title = {'รายงานอุบัติภัย'}
                color = {'seagreen'}
            />
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.subTopic}>สถานที่เกิดเหตุ</Text>   
                    { address?.aoi ? 
                        <Text style={styles.addressText}>{address?.aoi}</Text> : null
                    }
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.addressText}>{address?.subdistrict + '  '}</Text>
                        <Text style={styles.addressText}>{address?.district}</Text>
                    </View>
                    <Text style={styles.addressText}>{address?.province}</Text>
                    <Text style={styles.addressText}>{address?.postcode}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subTopic}>รายละเอียด</Text> 
                    <TextInput style={{borderWidth:1,margin:5,color:'black'}} 
                        placeholder={'กรุณาใส่รายละเอียด'}
                        multiline = {true}
                    />
                    <TouchableOpacity style={styles.reportbtn} onPress={() => navigation.navigate('ImagesCollection')}>
                        <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
                            <Icon name='image' size={30}/>
                            ใส่รูปภาพ
                        </Text>
                    </TouchableOpacity>
                </View> 
            </ScrollView>
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                <TouchableOpacity style = {styles.reportbtn} 
                onPress={
                    async () => { 
                        try{

                            await send()

                        } catch (err) {

                            willAlert('เครือข่ายมีปัญหา',err.message);

                        } finally {

                            navigation.navigate('Map');

                        }

                    }} >
                    <Text style = {styles.reportText}>
                        รายงาน
                    </Text>
                </TouchableOpacity>
            </View>
            
                

        </SafeAreaView>
      );

}

export default ReportModal;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topView:{
        width: '100%', 
        height: 60, 
        flexDirection: 'row',
        backgroundColor : 'seagreen',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    title :
    {
      fontSize : 24,
      fontWeight : 'bold',
    },
    iconBack : {
        position:'absolute',
        left:10
    },
    subTopic: {
        fontWeight:'bold',
        fontSize: 18,
        color:'dimgray'
    },
    section: {

        backgroundColor:'red',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        backgroundColor: 'white',
        margin:10,
        padding:10,
        borderRadius:10

    },
    recButton: {
        backgroundColor: "lightblue",
        borderColor: 'dodgerblue',
        borderWidth:5,
        padding: 25,
        elevation: 2,
        alignItems:'center',
        alignSelf:'center',
        margin: 10
    },
    addressText: {
        fontSize: 16,
        color:'dimgray'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '80%'
    },
    buttonOpen: {
        backgroundColor: "lightblue",
    },
    reportbtn : {
        backgroundColor : 'springgreen',
        padding : 10 ,
        margin : 10,
        flex:1,
        alignItems:'center',
        borderRadius:10
    },
    reportText:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    }
  });