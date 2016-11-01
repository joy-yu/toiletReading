import React from 'react';
import {
  StyleSheet,
  View,
  BackAndroid,
  TouchableOpacity,
  WebView,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class WebViewPage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {};
  }

  pressButton() {
      const { navigator } = this.props;
      if(navigator) {
        navigator.pop();
      }
  }

  componentDidMount(){
    this.setState({url:this.props.url});
  }

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }
  componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }
  onBackAndroid = () => {
    const {navigator} = this.props;
    const routers = navigator.getCurrentRoutes();
    if (routers.length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={this.pressButton.bind(this)} style={styles.iback} >
            <Icon
              name='md-arrow-back'
              size={25}
              color='#fff'
            />
          </TouchableOpacity>
          <Text style={styles.author}>{this.props.author}</Text>
        </View>


        <WebView
          //startInLoadingState={true}
          source={{uri:this.state.url}}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1
  },
  header:{
    height:50,
    backgroundColor:'#3e9ce9',
    flexDirection:'row',
    alignItems:'center'
  },
  iback:{
    width:50,height:50,
    justifyContent:'center',
    alignItems:'center'
  },
  author:{
    color:'#fff',
    fontSize:20
  }
});

