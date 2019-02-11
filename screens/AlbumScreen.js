import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, FlatList,TouchableOpacity } from 'react-native';

export default class AlbumScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Model Details'),
    };
  };
  
  constructor(){
    super();
    this.state = {
        data: null,
        loading: false,
        error: null,
        albumId: 666,
    }
  }
  baseURL = 'http://gallery.vallka.com/api.php';

  getData = (ev)=>{
    const itemId = this.props.navigation.getParam('name', 'NO-ID');
    this.setState({loading:true, error: null, albumId: itemId});
    let url = this.baseURL + '/albums/' + itemId + '/content/';
    console.log('getData:'+url);
    let req = {
      method: 'GET',
      headers: {},
    };

    fetch(url,req)
    .then(response=>response.json())
    .then(this.showData)
    .catch(this.badStuff)
  }
  showData = (data)=>{
    console.log('showData');
    console.log('data '+data.total);

    for (let i=0; i<data.content.length; i++) {
      data.content[i].key = data.content[i].id.toString();
    }



    this.setState({data:data,loading:false});
  }

  badStuff = (err) => {
    this.setState({loading: false, error: err.message});
  }
  componentDidMount(){
    console.log('componentDidMount');
    this.getData();
      //geolocation -> fetch
  }

  _onPressItem = (key) => {
    console.log('Press'+key);
  };

  render() {
    const itemId = this.props.navigation.getParam('name', 'NO-ID');
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
      <View  style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}>
                { this.state.loading && (
                  <View style={{margin:70}}>
                    <Text style={styles.txt}>LOADING...</Text>
                  </View>
                )}
                { this.state.error && (
                    <Text style={styles.err}>{this.state.error}</Text>
                )}
              { !this.state.loading && this.state.data && this.state.data.content && this.state.data.content.length > 0 && (
                <FlatList
                  data={this.state.data.content}
                  renderItem={({item})=>(
                      <View style={styles.item}>
                        <Image
               source={ {uri: item.presets.medium.url} }
               style={styles.welcomeImage}
                        />
                      </View>
                  )}
                />    
                )}

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
  },
  item: {
    backgroundColor: '#222',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtView: {
    margin: 0,
    width: '100%',
    alignItems: 'center',

  },
  txt: {
    fontSize: 24,
    color: '#eee',
    backgroundColor: '#C108C7',
    padding: 8,
  },
  txtSmall: {
    fontSize: 14,
    color: '#eee',
    backgroundColor: '#222',
    padding: 8,
  },
  err:{
      color: 'red',
      fontSize: 30,
      fontWeight: 'bold'
  },
  welcomeImage: {
    width: 400,
    height: 500,
    resizeMode: 'contain',
  },
});


