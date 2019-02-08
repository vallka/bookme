import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, FlatList,TouchableOpacity } from 'react-native';

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'List',
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
    let url = this.baseURL + '/albums/';
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

  _onPressItem = (key) => {
    console.log('Press'+key);
    alert('press '+key)
    this.props.navigation.navigate('Album', {name: key})
  };

  render() {
    return (
      <View style={styles.container}>
                { this.state.loading && (
                    <Text>LOADING</Text>
                )}
                { !this.state.data && (
                  <Text style={styles.txt}>No data yet!</Text>
                )}
                { this.state.error && (
                    <Text style={styles.err}>{this.state.error}</Text>
                )}
                { !this.state.loading && this.state.data && this.state.data.albums && this.state.data.albums.length > 0 && (
                <FlatList
                  data={this.state.data.albums}
                  renderItem={({item})=>(
                      <TouchableOpacity onPress={()=>this._onPressItem(item.key)}>
                        <View  >
                        <Text style={styles.txt}>
                           ={ item.title }=
                        </Text>
                        <Image
                         source={ {uri: item.cover_url} }
                         style={styles.welcomeImage}
                        />
                        </View>
                      </TouchableOpacity>
                  )}
                />    
                )}

      </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  txt: {
    fontSize: 24,
    color: '#333',
    backgroundColor: '#0f0',
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
