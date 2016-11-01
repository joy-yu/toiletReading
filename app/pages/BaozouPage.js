import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';

export default class BaozouPage extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      isError:false
    };
  }

  render(){
    return(
      <View style={styles.container}>
      {
        this.state.isError?
        <TouchableOpacity onPress={()=>this.setState({isError:false})} style={styles.errInfo}>
          <Text>网络错误，请检查网络，并轻触刷新</Text>
        </TouchableOpacity>
        :
        <WebView
          startInLoadingState={true}
          onError={()=>this.setState({isError:true})}
          source={{uri:'http://m.baozoumanhua.com/app_pages/5/articles.mobile'}}/>
      }
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container:{
    flex:1,
  },

  errInfo:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }

});
