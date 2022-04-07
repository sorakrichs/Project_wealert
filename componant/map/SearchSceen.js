import React, { useState , useEffect, useMemo,useRef,useCallback} from 'react';
import {
    SafeAreaView,
    TextInput,
    PermissionsAndroid,
    Platform,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    Alert,
    ToastAndroid,
    Linking,
    View,
    Button,
    TouchableOpacity,
    SectionList,
  } from 'react-native';
import { useMap } from '../../providers/MapProvider';

const SearchScreen = ({route,navigation}) => {
    const {map} = useMap();
    const {keyAPI,Longdo} = useMap();
    const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 1,
              backgroundColor: '#C8C8C8',
              marginHorizontal: 12,
            }}
          />
        );
      };
  
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    const Item = ({title}) => {
        return (
          <View>
            <Text style={styles.textSuggest} onPress={() => getItem(title)}>
              {title}
            </Text>
          </View>
        );
      };

    const DATA = [
        {
          data: filteredDataSource.map(item => item.w),
        },
      ];

      const getItem = item => {
        const urlSearch =
          'https://search.longdo.com/mapsearch/json/search?limit=20&key=' +
          keyAPI +
          '&keyword=' +
          item;
        fetch(urlSearch)
          .then(res => res.json())
          .then(resJson => {

            let location = {
                lon: resJson.data[0].lon,
                lat: resJson.data[0].lat,
              };
              
            map.current.call('location', location);
            let Marker = Longdo.object('Marker', location);
            Marker.$id = 1000;
            map.current.call('Overlays.add', Marker);   
            navigation.navigate('Map');
          })
          .catch(error => {
            console.error(error);
          });
      };
      
    const searchFilterFunction = text => {
        if (text.length >= 3) {
          const urlSuggest =
            'https://search.longdo.com/mapsearch/json/suggest?limit=100&key=' +
            keyAPI +
            '&keyword=' +
            text;
          fetch(urlSuggest)
            .then(res => res.json())
            .then(resJson => {
              setFilteredDataSource(resJson.data);
            })
            .catch(error => {
              console.error(error);
            });
          setSearch(text);
        } else {
          setFilteredDataSource([]);
          setSearch(text);
        }
      };
  
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.buttonBack}>
            <Button title="Back" onPress={() => navigation.navigate('Map')} />
          </TouchableOpacity>
          <TextInput
            style={styles.inputSearch}
            placeholder="ค้นหาสถานที่"
            onChangeText={text => searchFilterFunction(text)}
            autoFocus
            value={search}
            placeholder="ใส่คำค้นหา"
          />
        </View>
        <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={({item}) => <Item title={item} />}
        />
      </View>
    );
  }

  module.exports = SearchScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#fff',
      zIndex: 10,
    },
    buttonBack: {
      marginVertical: 12,
      marginHorizontal: 10,
      height: 40,
    },
    inputSearch: {
      flex: 6,
      height: 40,
      marginRight: 12,
      marginTop: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#fff',
      zIndex: 10,
    },
    textSuggest: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 12,
      backgroundColor: 'white',
      color:'black'
    },
    fixToText: {
      position: 'absolute',
      bottom: 30,
      right: 5,
      flexDirection: 'column',
      zIndex: 2,
    },
  });