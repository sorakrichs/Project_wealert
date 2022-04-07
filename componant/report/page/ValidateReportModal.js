
import React,{useState, useMemo,useEffect,useCallback} from 'react'
import {
    View,
    Text,
    Image,
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
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useReport} from '../../../providers/ReportProvider'
import {useMap} from '../../../providers/MapProvider'
import {useAlert} from '../../../providers/AlertProvider'
import cardata from '../../../data/cardata.json'
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../../subComponant/Header'

const ReportModal = ({navigation,route}) => {

    const {willAlert} = useAlert();
    const {
        getLocation,
        address,
        setAddress,
        send,type,setType,subType,setSubType,
        validate,
        description,setDescription} = useReport();

        const [validateButton,setValidateButton] = useState(false);
        const [litigant,setLitigant] = useState([{license:'',make:'',model:'',category:''}]);
        const [patient,setPatient] = useState([{name:'',surname:'',symptom:''}]);
        const [range,setRange] = useState(null);
        const [depth,setDepth] = useState(null);
        const [magnitude,setMagnitude] = useState(null);
        const [makeOpen, setMakeOpen] = useState([false]);
        const [modelOpen, setModelOpen] = useState([false]);

        const clearData = () => {
            setLitigant([{license:null,make:null,model:null,category:null}]);
            setPatient([{name:null,surname:null,symptom:null}]);
            setRange(null);
            setMagnitude(null);
            setMakeOpen([false]);
            setModelOpen([false]);
            setValidateButton(false);
            setDepth(null);
        }
      
        const addLitigant = () => {
            setLitigant([...litigant,{license:null,make:null,model:null,category:null}]);
            setMakeOpen([...makeOpen,false]);
            setModelOpen([...modelOpen,false]);
        }

        const addPatient = () => {
            setPatient([...patient,{name:null,surname:null,symptom:null}]);

        }

    useEffect(()=> {    
        
        let active = true; 
        if(route?.params?.address && active)
            setAddress(route?.params?.address);
        return () => { active = false;};

    },[])
    /*const a = () => {
        try {

            if(!type) {
                willAlert('กรุณาเลือกประเภท');
            } else {
                willAsk('ยืนยันการตรวจสอบ','ดูให้แน่ใจก่อนที่จะยืนยันpinนี้',() => setPinValidate,[pin_id,type,newData],'ask');
                onClose();
            }

        } catch(err) {
            willAlert('เกิดข้อผิดพลาด',err.message);
        }

    }*/



    return (
        <SafeAreaView style={styles.container}>
            <Header
                navigation={navigation}
                title = {'ยืนยันอุบัติภัย'}
                color = {'limegreen'}
    
            />
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.subTopic}>ประเภทอุบัติภัย</Text> 
                    <View style={styles.selectSection}>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor: 'gray',
                                borderWidth: (type == 'car') ? 5: 0,
                                padding: (type == 'car') ? -5 : 0

                            }]}  
                            onPress={() => {setType('car'); setSubType(null); clearData(); }}
                        >
                            <Icon name="car" size={80} color="white"/>
                            <Text style={styles.selectText}>ยานยนต์</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor:'orangered',
                                borderWidth: (type == 'fire') ? 5: 0,
                                padding: (type == 'fire') ? -5 : 0
                            }]}  
                        
                        onPress={() => {setType('fire');  setSubType(null); clearData(); }}>
                            <MIcon name="fire" size={80} color="white"/>
                            <Text style={styles.selectText}>ไฟไหม้</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor:'royalblue',
                                borderWidth: (type == 'flood') ? 5: 0,
                                padding: (type == 'flood') ? -5 : 0
                            }]}  
                        
                        onPress={() => {setType('flood');  setSubType(null); clearData(); }}>
                            <MIcon name="home-flood" size={80} color="white"/>
                            <Text style={styles.selectText}>น้ำท่วม</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor:'yellowgreen',
                                borderWidth: (type == 'epidemic') ? 5: 0,
                                padding: (type == 'epidemic') ? -5 : 0
                            }]}  
                        
                        onPress={() => {setType('epidemic');  setSubType(null); clearData(); }}>
                            <MIcon name="virus" size={80} color="white"/>
                            <Text style={styles.selectText}>โรคระบาด</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor: 'lightgray',
                                borderWidth: (type == 'earthquake') ? 5: 0,
                                padding: (type == 'earthquake') ? -5 : 0,
                                borderColor:'gray',
                                padding:5
                            }]}  
                            onPress={() => {setType('earthquake');  setSubType(null); clearData(); }}
                        >
                            <Image source={require('../../../assets/report/earthquake.png')} style={{width: 90, height: 90}}/>
                            <Text style={styles.selectText}>แผ่นดินไหว</Text>
                        </TouchableOpacity>
                    </View>
                </View> 


                { (type == 'car') ? 
                <View style={styles.section}>
                    <Text style={styles.subTopic}>รูปแบบ</Text> 
                    <View style={styles.selectSection}>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor: 'lightgray',
                                borderWidth: (subType == 'broken') ? 5: 0,
                                padding: (subType == 'broken') ? -5 : 0,
                                borderColor:'gray',
                                padding:5
                            }]}  
                            onPress={() => {setSubType('broken'); clearData();}}
                        >
                            <Image source={require('../../../assets/report/brokencar.png')} style={{width: 90, height: 90}}/>
                            <Text style={styles.selectText}>รถเสีย</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor: 'lightsteelblue',
                                borderWidth: (subType == 'crash') ? 5: 0,
                                padding: (subType == 'crash') ? -5 : 0,
                                borderColor:'gray',
                                padding:5
                            }]}  
                            onPress={() => {setSubType('crash'); clearData();}}
                        >   
                            <Image source={require('../../../assets/report/carcrash.png')} style={{width: 90, height: 90}}/>
                            <Text style={styles.selectText}>รถชน</Text>
                        </TouchableOpacity>
                    </View>
                </View>  :
                (type == 'fire') ? 
                <View style={styles.section}>
                    <Text style={styles.subTopic}>รูปแบบ</Text> 
                    <View style={styles.selectSection}>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                borderWidth: (subType == 'A') ? 2: 0,
                                padding: (subType == 'A') ? -2 : 0,
                                borderColor:'gray',
                                padding:5

                            }]}  
                            onPress={() => {setSubType('A'); setValidateButton(range);}}
                        >
                            <Image source={require('../../../assets/manual/ClassAFire.png')} style={{width: 90, height: 90}}/>
                            <Text style={styles.selectText}>A</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                borderWidth: (subType == 'B') ? 2: 0,
                                padding: (subType == 'B') ? -2 : 0,
                                borderColor:'gray',
                                padding:5

                            }]}  
                            onPress={() => {setSubType('B'); setValidateButton(range);}}
                        >   
                            <Image source={require('../../../assets/manual/ClassBFire.png')} style={{width: 90, height: 90}}/>
                            <Text style={styles.selectText}>B</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                borderWidth: (subType == 'C') ? 2: 0,
                                padding: (subType == 'C') ? -2 : 0,
                                borderColor:'gray',
                                padding:5

                            }]}  
                            onPress={() => {setSubType('C'); setValidateButton(range);}}
                        >   
                            <Image source={require('../../../assets/manual/ClassCFire.png')} style={{width: 90, height: 90}}/>
                            <Text style={styles.selectText}>C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                borderWidth: (subType == 'D') ? 2: 0,
                                padding: (subType == 'D') ? -2 : 0,
                                borderColor:'gray',
                                padding:5

                            }]}  
                            onPress={() => {setSubType('D'); setValidateButton(range);}}
                        >   
                            <Image source={require('../../../assets/manual/ClassDFire.png')} style={{width: 90, height: 90}}/>
                            <Text style={styles.selectText}>D</Text>
                        </TouchableOpacity>
                    </View>
                </View>: null }





                { (subType == 'broken') ? 
                <View style={styles.section}>
                    <Text style={styles.subTopic}>รถที่ประสบเหตุ</Text> 
                    <View style={{flex:1,margin:10}}>
                        <Text style={styles.textStyle}>ทะเบียน</Text>
                        <TextInput 
                            style={{borderWidth:1}}
                            placeholder={'ป้ายทะเบียน'}
                            onChangeText={(text) =>  {
                                litigant[0] = {...litigant[0],license: text};
                                setLitigant(litigant)
                            }}
                            defaultValue={litigant[0].license}
                            onEndEditing={() => setValidateButton(litigant[0].license && litigant[0].model)}
                        />
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <View style = {{flex:1,margin:5}}>
                            <Text style={styles.textStyle}>ยี่ห้อ</Text>
                            <DropDownPicker
                                open={makeOpen[0]}
                                value={litigant[0]?.make}
                                items={ Object.keys(cardata).map((value) =>
                                    ({
                                        label: value,
                                        value: value
                                    })
                                )}
                                onOpen={() => setMakeOpen(prev => {
                                    let data = [...prev];
                                    data[0] = true;
                                    return data;
                                })}
                                onClose={() => setMakeOpen(prev => {
                                    let data = [...prev];
                                    data[0] = false;
                                    return data;
                                })}
                                onSelectItem={(item) => {
                                    litigant[0] = {...litigant[0],make: item.value};
                                    setLitigant(litigant)
                                }}
                                listMode="MODAL"
                                placeholder="เลือกยี่ห้อรถ"
                                modalProps={{
                                    animationType: "slide"
                                }}

                            />
                        </View>
                        <View style = {{flex:1,margin:5}}>
                            <Text style={styles.textStyle}>รุ่น</Text>
                            <DropDownPicker
                                open={modelOpen[0]}
                                value={litigant[0]?.model}
                                items={(litigant[0]?.make) ? Object.keys(cardata[litigant[0]?.make]).map((value) =>
                                    ({
                                        label: value,
                                        value: value
                                    })
                                ) : []}
                                onOpen={() => setModelOpen(prev => {
                                    let data = [...prev];
                                    data[0] = true;
                                    return data;
                                })}
                                onClose={() => setModelOpen(prev => {
                                    let data = [...prev];
                                    data[0] = false;
                                    return data;
                                    })}
                                onSelectItem={(item) => {
                                    litigant[0] = {...litigant[0],model: item.value,category: cardata[litigant[0]?.make][item.value].category};
                                    setLitigant(litigant);
                                }}
                                onChangeValue={() => setValidateButton(litigant[0].license && litigant[0].model)}

                                listMode="MODAL"
                                placeholder="เลือกรุ่น"
                                modalProps={{
                                    animationType: "slide"
                                }}
                                disabled={(litigant[0]?.make) ? false : true}
                            />
                        </View>
                    </View>
                    { litigant[0]?.category ?
                        <View style = {{flex:1,margin:5,alignItems:'center'}}>
                            <Text style={styles.textStyle}>ประเภท</Text>
                            {   litigant[0]?.category.map((value,index) =>
                                <Text key={index} style={{fontSize:14}}>{value}</Text>
                            )}
                        </View> : null }
                    </View> : 

                
                (subType == 'crash') ?             
                <View style={styles.section}>
                    <Text style={styles.subTopic}>รถที่ประสบเหตุ</Text> 
                    { litigant.map((value,index) =>
                        <View key={index} style={styles.inputSection}>
                            <Text style={{fontSize:18,color:'dimgray'}}>{`ผู้ประสบภัย ${index + 1}`}</Text>
                            <View style={{flex:1,margin:10}}>
                                <Text  style={styles.textStyle}>ทะเบียน</Text>
                                <TextInput 
                                    
                                    style={{borderWidth:1}}
                                    placeholder={'ป้ายทะเบียน'}
                                    onChangeText={(text) =>  {
                                        litigant[index] = {...value,license: text};
                                        setLitigant(litigant);
                                    }}
                                    defaultValue={value?.license}
                                    onEndEditing={() => setValidateButton(litigant[index]?.license && value?.model && text)}
                                />
                            </View>
                            <View style={{flexDirection:'row',marginTop:10}}>
                                <View  style = {{flex:1,margin:5}}>
                                    <Text  style={styles.textStyle}>ยี่ห้อ</Text>
                                    <DropDownPicker
                                        open={makeOpen[index]}
                                        value={value?.make}
                                        items={ Object.keys(cardata).map((value) =>
                                            ({
                                                label: value,
                                                value: value
                                            })
                                        )}
                                        onOpen={() => setMakeOpen(prev => {
                                            let data = [...prev];
                                            data[index] = true;
                                            return data;
                                        })}
                                        onClose={() => setMakeOpen(prev => {
                                            let data = [...prev];
                                            data[index] = false;
                                            return data;
                                        })}
                                        onSelectItem={(item) => {
                                            let data = {...value,make: item.value};
                                            litigant[index] = data;
                                            setLitigant(litigant)
                                        }}

                                        listMode="MODAL"
                                        placeholder="เลือกยี่ห้อรถ"
                                        modalProps={{
                                            animationType: "slide"
                                        }}

                                    />
                                </View>
                                <View  style = {{flex:1,margin:5}}>
                                    <Text  style={styles.textStyle}>รุ่น</Text>
                                    <DropDownPicker
                                        
                                        open={modelOpen[index]}
                                        value={value?.model}
                                        items={(value?.make) ? Object.keys(cardata[value?.make]).map((value) =>
                                            ({
                                                label: value,
                                                value: value
                                            })
                                        ) : []}
                                        onOpen={() => setModelOpen(prev => {
                                            let data = [...prev];
                                            data[index] = true;
                                            return data;
                                        })}
                                        onClose={() => setModelOpen(prev => {
                                            let data = [...prev];
                                            data[index] = false;
                                            return data;
                                        })}
                                        
                                        onSelectItem={(item) => {
                                            const category = cardata[value?.make][item.value].category;
                                            let data = {...value,model: item.value,category: category};
                                            litigant[index] = data;
                                            setLitigant(litigant);
                                            
                                        }}
                                        onChangeValue={() => setValidateButton(value?.license && value?.model)}
                                        listMode="MODAL"
                                        placeholder="เลือกรุ่น"
                                        modalProps={{
                                            animationType: "slide"
                                        }}
                                        disabled={(value?.make) ? false : true}
                                    />
                                </View>
                            </View>
                            { value?.category &&
                                <View  style = {{flex:1,margin:5,alignItems:'center'}}>
                                    <Text style={styles.textStyle}>ประเภท</Text>
                                    {   value?.category.map((value,index) =>
                                        <Text key={index} style={{fontSize:14}}>{value}</Text>
                                    )}
                                </View>
                            }
                        </View>
                    )}
                        <TouchableOpacity style = {styles.reportbtn} onPress={() => {setValidateButton(false);addLitigant()}}>
                            <Text style = {styles.reportText}>
                                    เพิ่ม
                            </Text>
                        </TouchableOpacity>
                    </View> : null }

                {(type == 'fire' || type == 'earthquake') && 
                <View style={styles.section}>
                    <Text style={[styles.subTopic,{marginBottom:10}]}>รัศมีของผลกระทบ</Text> 
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap',alignItems:'center'}}>
                        <TextInput 

                            keyboardType='number-pad'
                            style={{flex:1,borderWidth:1,margin:5}}
                            placeholder={'ระยะ'}
                            onChangeText={setRange}
                            onEndEditing={() => setValidateButton(range && (magnitude || type!= 'earthquake') && (subType || type!= 'fire'))}
                        />
                        <Text style={styles.textStyle}>กิโลเมตร</Text> 
                    </View>
                </View>}

                {type == 'earthquake' && 
                <View style={styles.section}>
                    <Text style={[styles.subTopic,{marginBottom:10}]}>ขนาดของแผ่นดินไหว</Text> 
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap',alignItems:'center'}}>
                        <TextInput 

                            keyboardType='number-pad'
                            style={{flex:1,borderWidth:1,margin:5}}
                            placeholder={'ขนาด'}
                            onChangeText={setMagnitude}
                            onEndEditing={() => setValidateButton(magnitude && range)}
                            
                        />
                    </View>
                </View>}

                {type == 'flood' && 
                <View style={styles.section}>
                    <Text style={[styles.subTopic,{marginBottom:10}]}>ความลึก</Text> 
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap',alignItems:'center'}}>
                        <TextInput 

                            keyboardType='number-pad'
                            style={{flex:1,borderWidth:1,margin:5}}
                            placeholder={'ความลึก'}
                            onChangeText={setDepth}
                            onEndEditing={() => setValidateButton(depth)}
                            
                        />
                    </View>
                </View>}
                

                { type == 'epidemic' && 
                <View style={styles.section}>
                    <Text style={styles.subTopic}>ผู้ป่วย</Text> 
                    { patient.map((value,index) =>
                        <View key={index} style={styles.inputSection}>
                            <Text style={{fontSize:18,color:'dimgray'}}>{`ผู้ป่วยที่ ${index + 1}`}</Text>
                            <View style={{flex:1,margin:10}}>
                                <Text  style={styles.textStyle}>ชื่อ</Text>
                                <TextInput 
                                    
                                    style={{borderWidth:1}}
                                    placeholder={'ชื่อ'}
                                    onChangeText={(text) =>  {
                                        patient[index] = {...patient[index],name: text};
                                        setPatient(patient);
                                        setValidateButton(patient[index]?.name != '' && patient[index]?.surname != '' && patient[index]?.symptom != '' && text);
                                    }}
                                />
                            </View>
                            <View style={{flex:1,margin:10}}>
                                <Text  style={styles.textStyle}>นามสกุล</Text>
                                <TextInput 
                                    
                                    style={{borderWidth:1}}
                                    placeholder={'นามสกุล'}
                                    onChangeText={(text) =>  {
                                        patient[index] = {...patient[index],surname: text};
                                        setPatient(patient);
                                        setValidateButton(patient[index]?.name != '' && patient[index]?.surname != '' && patient[index]?.symptom != '' && text);
                                    }}
                                />
                            </View>
                            <View style={{flex:1,margin:10}}>
                                <Text  style={styles.textStyle}>อาการของผู้ป่วย</Text>
                                <TextInput 
                                    
                                    style={{borderWidth:1}}
                                    placeholder={'อาการของผู้ป่วย'}
                                    onChangeText={(text) =>  {
                                        patient[index] = {...patient[index],symptom: text};
                                        setPatient(patient);
                                        setValidateButton(patient[index]?.name != '' && patient[index]?.surname != '' && patient[index]?.symptom != '' && text);
                                    }}
                                    multiline={true}
                                />
                            </View>
                        </View>
                    )}
                        <TouchableOpacity style = {styles.reportbtn} onPress={() => {setValidateButton(false); addPatient();}}>
                            <Text style = {styles.reportText}>
                                    เพิ่ม
                            </Text>
                        </TouchableOpacity>
                    </View>

                }

            



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
                    <Text style={styles.subTopic}>รายละเอียดเพิ่มเติม</Text> 
                    <TextInput style={{borderWidth:1,margin:5}} 
                        placeholder={'กรุณาใส่รายละเอียด'}
                        multiline = {true}
                        onChangeText = {(text) => {setDescription(text)}}
                    />
                    <TouchableOpacity style={styles.reportbtn} onPress={() => navigation.navigate('ImagesCollection')}>
                        <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
                            <Icon name='image' size={30}/>
                            ใส่รูปภาพ
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View opacity={(validateButton) ? 1 : 0.5} style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                <TouchableOpacity style = {styles.reportbtn} disabled={!validateButton}
                onPress={ 
                    async () => { 
                        try{

                            let data = {};
                            switch(type) {

                                case('car'): 
                                    data.litigant = litigant;
                                    setLitigant([{license:null,make:null,model:null,category:null}]);
                                break;
                                case('fire'): 
                                    data.range = range;
                                    setRange(null);
                                break;
                                case('flood'):
                                    data.depth = depth;
                                    setDepth(null);
                                break;
                                case('earthquake'):
                                    data.magnitude = magnitude;
                                    data.range = range;
                                    setMagnitude(null);
                                    setRange(null);
                                break;
                                case('epidemic'):
                                    data.patient = patient;
                                    setPatient([{name:null,surname:null,symptom:null}]);
                                break;

                            }

                            await validate(data);

                        } catch (err) {

                            willAlert('เครือข่ายมีปัญหา',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);

                        } finally {

                            navigation.navigate('Map');

                        }

                    }} >
                    <Text style = {styles.reportText}>
                        ยืนยันการรายงาน
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
        left:10,
        fontWeight:'bold',
        fontSize: 18,
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
    typeButton: {
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        margin:10
    },
    addressText: {
        fontSize: 16,
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
    },
    textStyle: {
        fontSize:16,
        color:'dimgray',
        marginBottom: 2
    },
    inputSection: {
        borderWidth:1,
        borderColor:'black',
        padding:10,
        marginTop:10,
        marginBottom:10,
        borderRadius:10
    },
    selectSection: {
        flex: 1,
        flexDirection: 'row', 
        flexWrap: 'wrap',
        margin:10,
        alignItems:'center',
        justifyContent: 'center'
    },
    selectText: {
        alignSelf:'center',
        fontSize: 16,
        color: 'black'
    }
  });