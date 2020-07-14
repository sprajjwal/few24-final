import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import data from './metal.json';

import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight

const Tabs = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Bands') {
              return focused ? 
              <Icon name="hand-grab-o" size={25} color="#f00" />
              :
              <Icon name="hand-grab-o" size={25} color="#600" />
            } else {
              return focused ? 
                <Icon name="bar-chart-o" size={25} color="#f00" />
                :
                <Icon name='bar-chart-o' size={25} color="#600" />
            }
          }
        })}
        tabBarOptions={{
          activeBackgroundColor: '#111',
          inactiveBackgroundColor: '#000',
          activeTintColor: '#f00',
          inactiveTintColor: '#600',
          style: {
            height: 85,
            borderTopColor: 'black',
          },
          labelStyle: {
            fontSize: 15,
            margin: 0,
            padding: 0,
          },
        }} >
          <Tabs.Screen name="Bands" component={Bands} />
          <Tabs.Screen name="Stats" component={Stats} />
      </Tabs.Navigator>
    </NavigationContainer>
    
  );
}

function Bands() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return(
            <View style={styles.listItem}>
              <View style={styles.listItemRow}>
                <Text style={item.split === '-' ? styles.band : styles.bandSplit}>{item.band_name}</Text>
                <Text style={styles.origin}>{item.origin}</Text>
              </View>
              <View style={styles.listItemRow}>
                <Text style={styles.numbers}>{item.formed}</Text>
                <Text style={styles.numbers} >{(item.fans * 1000).toLocaleString()}</Text>
              </View>
            </View>
          )
        }}
        keyExtractor={item => item.ID}
        />
    </View>
  )
}

function Stats() {
  let fans = 0;
  let countries = {};
  let active = 0;
  let split = 0;
  for (let band of data) {
    fans += band.fans;
    countries[band.origin] = 1
    split === '-' ? active ++ : split ++
  }

  return (
    <View style={styles.container}>
      <Text style={styles.statsHeader}>METAL🤘</Text>
      <Text style={styles.statsData}>Count: <Text style={styles.value}>{data.length}</Text></Text>
      <Text style={styles.statsData}>Fans: <Text style={styles.value}>{(fans * 1000).toLocaleString()}</Text></Text>
      <Text style={styles.statsData}>Countries: <Text style={styles.value}>{Object.keys(countries).length}</Text></Text>
      <Text style={styles.statsData}>Active: <Text style={styles.value}>{active}</Text></Text>
      <Text style={styles.statsData}>Split: <Text style={styles.value}>{split}</Text></Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    minHeight: '100%',
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    minWidth: '100%',
    minHeight: 80,
    maxHeight: 80,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  listItemRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  origin: {
    color: '#999',
    fontSize: 18
  },
  band: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  bandSplit: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: '#666',
    fontWeight: 'bold'
  },
  numbers: {
    fontSize: 18,
    color: 'white',
  },
  statsHeader: {
    color: 'white',
    fontSize: 40,
    margin: 4,
    fontWeight: 'bold',
  },
  value: {
    color: 'white',
    fontSize: 26,
    fontWeight: '300'
  },
  statsData: {
    margin: 4,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 26,
  }
});
