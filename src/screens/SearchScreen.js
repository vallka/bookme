import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, FlatList,TouchableOpacity,Picker } from 'react-native';
import { MyButton, MyBackground } from '../components/MyCompo';
import { UniPicker } from '../components/UniPicker';

export default class ListScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(){
    super();
    this.state = {
        sex: null,
        hairColor: null,
        eyeColor: null,
        height: null,
    }
  }

  search = ()=>{
    this.props.navigation.navigate('List',{sex: this.state.sex});
  }

  render() {
    const sex = ['Boys and Girls','Girls','Boys'];
    const hairColor = ['Hair: Any','Blonde','Brunette'];
    const eyeColor = ['Eyes: Any','Blue','Gray','Green'];
    const height = ['Height: Any','160cm','170cm','180cm','190cm','200cm'];

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

        <UniPicker options={sex} onValueChange={(value)=>this.setState({sex: value})} />
        <UniPicker options={hairColor} onValueChange={(value)=>this.setState({hairColor: value})} />
        <UniPicker options={eyeColor} onValueChange={(value)=>this.setState({eyeColor: value})} />
        <UniPicker options={height} onValueChange={(value)=>this.setState({height: value})} />

        <MyButton text='View Models' onPress={()=>this.search()}/>

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
