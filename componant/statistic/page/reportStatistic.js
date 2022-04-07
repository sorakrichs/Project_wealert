import React, { useState , useMemo, useRef,useCallback, memo} from 'react';
import {
    View,
    Text,
    NativeModules,
    LayoutAnimation,
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

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import {getReportStatistic} from '../../../controllers/reportControllers'
import Header from '../../subComponant/Header'
import {BottomSheetModal} from '@gorhom/bottom-sheet';
const testView = ({navigation}) => {

  const [data,setData] = useState(null);

  useMemo(async () => {
    
    let  statisticData = await getReportStatistic();

    statisticData.countAll = [
      {
        name: "อุบัติเหตุรถยนต์",
        population: statisticData.count.car,
        color: "gray",
        legendFontColor: "dimgray",
        legendFontSize: 13
      },
      {
        name: "ไฟไหม้",
        population: statisticData.count.fire,
        color: "red",
        legendFontColor: "dimgray",
        legendFontSize: 13
      },
      {
        name: "น้ำท่วม",
        population: statisticData.count.flood,
        color: "blue",
        legendFontColor: "dimgray",
        legendFontSize: 13
      },
      {
        name: "แผ่นดินไหว",
        population: statisticData.count.earthquake,
        color: "brown",
        legendFontColor: "dimgray",
        legendFontSize: 13
      },
      {
        name: "โรคระบาด",
        population: statisticData.count.epidemic,
        color: "green",
        legendFontColor: "dimgray",
        legendFontSize: 13
      }
    ];


    setData(statisticData);
  },[]);
  
    return (
      <View style={styles.container}>
        <Header
            navigation={navigation}
            title = {'สถิติ'}
            color = {'chocolate'}
        />  
      { data && <View style={styles.section}>
        <Text style={styles.topic}>จำนวนภัยพิบัตื</Text>
        <PieChart
        data={data.countAll}
        width={Dimensions.get("window").width * 0.9 } // from react-native
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          

        }}
        accessor={"population"}
        
        style={{
          marginVertical: 8,
          borderRadius: 32,
          backgroundColor:'seashell'
        }}
        />
        <Text style={styles.resultText}>{`จากทั้งหมด ${data.countAll.map(item => item.population).reduce((prev, next) => prev + next)} การรายงาน`}</Text>
      </View>}
    </View>
    );


}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
  },
  section: {
      backgroundColor:'seashell',
      margin:10,
      padding:10,
      borderRadius: 32,
      borderWidth:1,
      alignItems:'center'

  },
  topic: {
    fontSize:18,
    color:'black',
    fontWeight:'bold'
  },
  resultText: {
    fontSize:16,
    color:'black',
  }
});

export default testView;