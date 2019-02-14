import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button, 
  ActivityIndicator
} from 'react-native';

import { MyButton, MyBackground } from '../components/MyCompo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <MyBackground />
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
        <MyButton text='MODEL SIGN UP' onPress={()=>alert('Sigh up as a Model')}/>
        <MyButton text='AGENCY SIGN UP' onPress={()=>alert('Sigh up as an Agency')}/>
        <MyButton text='View Models!' onPress={()=>this.props.navigation.navigate('Search')}/>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00f',
  },
});

