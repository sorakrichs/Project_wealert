import React , { useState,useEffect } from 'react'
import { View , Text , StyleSheet , FlatList , TouchableOpacity, ScrollView,Image} from 'react-native'
import uuid from 'uuid-random';
import { add, onChange } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome'
import {role} from '../../../controllers/miscControllers'
import Header from '../../subComponant/Header'

const RegisVolunteerList = ({route,navigation}) => {

    const {member,setMember} = route.params
    const [text , setText] = useState('บ้าน');  
    const onChange = textValue => setText(textValue);
    const [items , setItems] = useState(member)
    const [refresh,setRefesh] = useState(0); //ใช้ refesh flatlist
    const [hasBoss,setHasBoss] = useState(false);

    const deleteItem = (id) => {

        const index = items.map((o) => o.id).indexOf(id);

        setItems(prevItems => {
            const array = prevItems;
            if(array[index]?.member?.teamrole == 'leader')
                setHasBoss(false)
            return prevItems.filter(item => item.id != id)
        })
    }
    
    const addMember = (member) => {

        if(member?.teamrole == 'leader')
            setHasBoss(true);

        setItems(prevItems => {
            return [...prevItems,{id: uuid(),member}];
        })
        
    }
    
    const editMember = (member,id) => {

        const index = items.map((o) => o.id).indexOf(id);

        setItems(prevItems => {
            const array = prevItems;
            if(array[index]?.member?.teamrole != member?.teamrole)
                (member?.teamrole == 'leader') ? setHasBoss(true) : setHasBoss(false);
            array[index] = {id: id,member};
            return array;
        })
        
        setRefesh(prev => prev+1);
        
    }

    const ListItem = ({item , deleteItem}) => {

        return (
            <View style = {styles.listItem}>
                <View style = {styles.listItemView}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{height: 100,width: 100,padding: 20}} source={{uri:item?.member?.image?.path}}/>
                            <View style={{flexDirection:'column',paddingLeft:10}}>
                                <Text>ชื่อบัญชี: {item.member.username}</Text>
                                <Text>ชื่อ-นามสกุล: {item.member.name} {item.member.surname}</Text>
                                <Text>หมายเลขโทรศัพท์: {item.member.phone}</Text>
                                <Text>ตำแหน่ง: {role.getRole(item.member.teamrole)}</Text>
                            </View>
                    </View>
                    <View style={{flexDirection:'row-reverse'}}>
                        <Icon name = 'remove' size = {30} color = 'firebrick'  style={{}}
                        onPress={() => deleteItem(item.id)}/>
                        <Icon name = 'edit' size = {25} color = 'black'  style={{padding:5}}
                        onPress={() => navigation.navigate('RegisMember',{itemid:item.id,member:item.member,addMember: editMember})}/>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Header
                navigation={navigation}
                title = {'สมาชิก'}
                color = {'chocolate'}
            />
            <FlatList data = {items} 
                nestedScrollEnabled
                extraData={refresh}
                renderItem = {({item}) => (<ListItem item = {item} deleteItem = {deleteItem}/>)}/>
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white',borderTopWidth:1}}>
                <TouchableOpacity style = {styles.addbtn} onPress = {() => navigation.navigate('RegisMember',{addMember: addMember,hasBoss: hasBoss})}>
                    <Icon name = 'plus' size = {20} style={{flex:2/5}}/>
                    <Text style = {styles.btnText}>
                    เพิ่มสมาชิก
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.okbtn} onPress = {() => {setMember(items); navigation.navigate('RegisOrganize')}}>
                    <Text style = {styles.btnText}>
                        ตกลง 
                    </Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: '#F3B15A',
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
    text : {
        color : '#fff',
        fontSize : 24,
        textAlign : 'center'
    },
    input : {
        height : 60,
        padding : 8,
        fontSize : 16
    },
    addbtn : {
        backgroundColor : 'coral',
        padding : 10 ,
        margin : 10,
        flex:1/2,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:3

    },
    okbtn : {
        backgroundColor : 'darkgreen',
        padding : 10 ,
        margin : 10,
        flex:1/2,
        alignItems:'center',
        borderRadius:3

    },
    btnText : {
        color : 'white',
        fontSize : 20,
        alignSelf : 'center'
    
    },
    listItem : {
        paddingLeft:10,
        paddingRight:10,
        borderBottomWidth : 1,
        borderColor : '#eee'
    },
    listItemView : {
        padding:10,
        backgroundColor : '#f8f8f8',
        borderWidth : 1,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        borderRadius:3,
        marginBottom:2
        
    },
    listItemText : {
        fontSize : 18,
        flex:19/20
    }
})

export default RegisVolunteerList;