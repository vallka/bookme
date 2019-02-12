import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, FlatList,TouchableOpacity,ActivityIndicator,Dimensions } from 'react-native';
import { MyButton, MyBackground } from '../components/MyCompo';

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Models',
  };
  constructor(){
    super();
    this.state = {
        data: null,
        loading: false,
        error: null
    }
  }
  baseURL = 'http://gallery.vallka.com/api.php';

  getData = (ev)=>{
    console.log('getData');
    this.setState({loading:true, error: null});
    //let url = this.baseURL + '/photos?albumId=4';
    let url = this.baseURL + '/categories/2/albums/';
    let req = {
      method: 'GET',
      headers: {},
    };

    fetch(url,req)
    .then(response=>response.json())
    .then(this.showData)
    .catch(this.badStuff)
  }
  showData = async (data)=>{
    console.log('showData');
    console.log('data '+data.total+' '+data.albums.length);

    if (data.albums && data.albums.length) {
      for (let i=0; i<data.albums.length; i++) {
        console.log(''+i+' '+data.albums[i].covers[0].id);
        let url_img = this.baseURL + '/content/' + data.albums[i].covers[0].id;
        let response = await fetch(url_img,{
          method: 'GET',
          headers: {}
        })
        .then((response)=>{return response.json()})
        .catch(this.badStuff)
        data.albums[i].cover_url=response.presets.medium.cropped.url;
        data.albums[i].key = data.albums[i].id.toString();
      }
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

  _onPressItem = (key,title) => {
    console.log('Press'+key);
    //alert('press '+key)
    this.props.navigation.navigate('Album', {name: key,title: title})
  };

  render() {
    const itemId = this.props.navigation.getParam('name', 'NO-ID');
    const dimensions = Dimensions.get('window');
    const imageWidth = Math.round(dimensions.width / 2);
    const imageHeight = imageWidth;
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
                { !this.state.loading && this.state.data && this.state.data.albums && this.state.data.albums.length > 0 && (
                <FlatList
                  data={this.state.data.albums}
                  renderItem={({item})=>(
                      <TouchableOpacity onPress={()=>this._onPressItem(item.key,item.title)} style={styles.item}>
                        <Text style={styles.txt}>
                           { item.title }
                        </Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image
                         source={ {uri: item.cover_url} }
                         style={{ height: imageHeight, width: imageWidth, resizeMode: 'contain'}}
                         />
                        <Text  style={styles.txtSmall}>
                           { item.summary }
                        </Text>
                        </View>                      
                      </TouchableOpacity>
                  )}
                />    
                )}

        </View>
      </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#00000070',
    marginBottom: 0,
    justifyContent: 'center',
  },
  txtView: {
    margin: 0,
    width: '100%',
    alignItems: 'center',

  },
  txt: {
    fontSize: 24,
    color: '#fff',
    backgroundColor: '#C108C780',
    padding: 8,
  },
  txtSmall: {
    fontSize: 14,
    color: '#fff',
    padding: 8,
  },
  err:{
      color: 'red',
      fontSize: 30,
      fontWeight: 'bold'
  },
  itemImage: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
});
