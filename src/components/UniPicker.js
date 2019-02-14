import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, ActionSheetIOS, Picker } from 'react-native';
import { getTimeFieldValues } from 'uuid-js';


export class UniPicker extends React.Component {
  constructor(){
    super();
    this.state = {
        value: null,
    }
  }
  getValue = ()=> {
      return this.state.value;
  }
  onSelectCategory = ()=> {
    ActionSheetIOS.showActionSheetWithOptions(
    { 
      options: this.props.options,
    },
    (buttonIndex) => {
        this.setState({ value: this.props.options[buttonIndex] });
        this.props.onValueChange(this.props.options[buttonIndex])
    }
    )

  }

  componentWillMount(){
    this.setState({ value: this.props.options[0] })
  }

  render() {
    if (Platform.OS === 'ios') return (
        <TouchableOpacity 
        onPress={()=>this.onSelectCategory()}>
        <Text style={styles.paragraphIOS}>
            {this.state.value}
        </Text>
        </TouchableOpacity>
        );
    else return (
        <Picker
        selectedValue={this.state.value}
        style={styles.paragraph}
        onValueChange={(itemValue, itemIndex) =>
            {   
                this.setState({value: itemValue});
                this.props.onValueChange(itemValue)
            }
        }>
        {
            this.props.options.map((value) => {
            return <Picker.Item label={ value } value={ value } key={ value } />
            })
        }
        </Picker>
    )
  }
}

const styles = StyleSheet.create({
  paragraph: {
    color: '#000',
    backgroundColor: '#fff',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 20,
    height: 50,
    padding: 10,
},
paragraphIOS: {
    color: '#000',
    backgroundColor: '#fff',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 20,
    height: 50,
    padding: 10,
    fontSize: 24,
},
});
