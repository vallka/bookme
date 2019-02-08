import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';

export default class AlbumScreen extends React.Component {
  static navigationOptions = {
    title: 'Album',
  };

  render() {
    const itemId = this.props.navigation.getParam('name', 'NO-ID');
    return (
      <ScrollView style={styles.container}>
        <Text>Album View: {itemId}</Text>
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
});
