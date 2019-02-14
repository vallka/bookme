import React from 'react';
import { 
  StyleSheet, Text, View, Button, ScrollView, Image, FlatList,TouchableOpacity,ActivityIndicator, Dimensions, Modal 
  } from 'react-native';
import { MyButton, MyBackground } from '../components/MyCompo';

export default class AlbumScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Model Details'),
      headerStyle: { backgroundColor: 'black' },
      headerTitleStyle: { color: 'white' },
      headerBackTitleStyle: { color: '#C108C7' },
      headerTintColor: '#C108C7',
      };
  };
  
  constructor(){
    super();
    this.state = {
        data: null,
        loading: false,
        error: null,
        albumId: 666,
        modalVisible: false,
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
    alert(this.props.navigation.getParam('title', 'Model Details') + ' Height..., Weight.., Hair Color..., Eye Color... Do you want to book this model?')
    //this.setState({modalVisible: true});
  };

  render() {
    const itemId = this.props.navigation.getParam('name', 'NO-ID');
    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round(dimensions.height * 0.8);
    const imageWidth = dimensions.width;
    
    return (
      <View style={styles.container}>
        <MyBackground />
        <View  style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}>
                { this.state.loading && (
                  <ActivityIndicator size="large" color="#C108C7" />
                  )}
                { this.state.error && (
                    <Text style={styles.err}>{this.state.error}</Text>
                )}
              { !this.state.loading && this.state.data && this.state.data.content && this.state.data.content.length > 0 && (
                <FlatList
                  data={this.state.data.content}
                  renderItem={({item})=>(
                      <TouchableOpacity onPress={()=>this._onPressItem(item.key,item.title)} style={styles.item}>
                      <View 
               >
                        <Image
               source={ {uri: item.presets.medium.url} }
               style={{ height: imageHeight, width: imageWidth, resizeMode: 'contain'}}
                        />
                        </View>
                      </TouchableOpacity>
                  )}
                />    
                )}


        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableOpacity
                onPress={() => {
                  this.setState({modalVisible: false});

                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </View>
      </View>
);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#00000070',
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtView: {
    margin: 0,
    width: '100%',
    alignItems: 'center',

  },
  err:{
      color: 'red',
      fontSize: 30,
      fontWeight: 'bold'
  },
  albumImage: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
});


