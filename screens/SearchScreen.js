import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, FlatList,TouchableOpacity } from 'react-native';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
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
    //this.getData();
      //geolocation -> fetch
  }

  _onPressItem = (key) => {
    console.log('Press'+key);
    alert('press '+key)
  };

  render() {
    return (
      <View style={styles.container}>
                { this.state.loading && (
                    <Text>LOADING</Text>
                )}
                { !this.state.data && (
                  <Text style={styles.txt}>Gimme some data===</Text>
                )}
                <Button title="Get Data"
                    onPress={this.getData} />
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
                           { item.title }
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

  render_1() {
    return (
      <ScrollView style={styles.container}>
                { this.state.loading && (
                    <Text>LOADING</Text>
                )}
                { !this.state.data && (
                  <Text style={styles.txt}>Gimme some data!!!???</Text>
                )}
                <Button title="Get Data"
                    onPress={this.getData} />
                { this.state.error && (
                    <Text style={styles.err}>{this.state.error}</Text>
                )}
                { !this.state.loading && this.state.data && this.state.data.albums && this.state.data.albums.length > 0 && (
                    this.state.data.albums.map( album => (
                        <View key={album.id} >
                        <Text key={album.id} style={styles.txt}>
                           { album.title }
                        </Text>
                        <Image
                         source={ {uri: album.cover_url} }
                         style={styles.welcomeImage}
                        />
                        </View>
                    ))
                )}      
      </ScrollView>
    );
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
