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
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode: 'cover',
              width: null,
              height: null,
              }}
            source={require ("../assets/images/bg.png")}
            />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
        <TouchableOpacity style={styles.button}onPress={()=>alert('Sigh up as Model')}>
        <Text style={styles.buttonText}>SIGN UP AS MODEL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}onPress={()=>alert('Sigh up as Agency')}>
        <Text style={styles.buttonText}>SIGN UP AS AGENCY</Text>
        </TouchableOpacity>

       
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Search')}>
          <Text style={styles.buttonText}>SEARCH MODELS</Text>
        </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#C108C7',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',

  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    textTransform: 'uppercase'
  },
  container: {
    flex: 1,
    backgroundColor: '#00f',
  },
});
