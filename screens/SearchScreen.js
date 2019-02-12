import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, FlatList,TouchableOpacity,Picker } from 'react-native';
import { MyButton, MyBackground } from '../components/MyCompo';

export default class ListScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(){
    super();
    this.state = {
        sex: 'All',
    }
  }

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

<Picker
    selectedValue={this.state.sex}
  style={styles.picker}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({sex: itemValue})
  }>
  <Picker.Item label="Gender - All" value="All"/>
  <Picker.Item label="Girls" value="Girls" />
  <Picker.Item label="Boys" value="Boys" />
</Picker>
       

        <MyButton text='View Models' onPress={()=>this.props.navigation.navigate('List')}/>

        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: '#000',
    /*marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,*/
    width: 300,
    height: 60,

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
  txt: {
    fontSize: 24,
    color: '#333'
  },
  err:{
      color: 'red',
      fontSize: 30,
      fontWeight: 'bold'
  },
  welcomeImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
    marginLeft: 10,
  },
});
