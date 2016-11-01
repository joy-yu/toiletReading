import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Linking,
  View,
} from 'react-native';
import Button from '../components/Button';

export default class AboutPage extends Component {

  onPress(url) {
    Linking.openURL(url);
  }

  render(){
    return(
      <View style={styles.container}>

        <View style={styles.top}>
          <Image style={styles.logo} source={require('../img/about_logo.png')}/>
          <Text style={styles.title}>Toilet Reading</Text>
          <Text>v 0.0.1</Text>
        </View>

        <View style={styles.bottom}>
          <Text>免责声明：所有数据内容来自</Text>
          <View style={{marginVertical:10}}>
            <Button
              style={styles.cite}
              text={'每日一文'}
              onPress={() => this.onPress('http://www.meiriyiwen.com')}
            />
            <Button
              style={styles.cite}
              text={'聚合数据'}
              onPress={() => this.onPress('https://www.juhe.cn')}
            />
            <Button
              style={styles.cite}
              text={'暴走漫画'}
              onPress={() => this.onPress('http://baozoumanhua.com')}
            />
          </View>
          <View style={styles.address}>
            <Text>@Github：</Text>
            <Button
              style={styles.cite}
              text={'https://github.com/joy-yu/toiletReading'}
              onPress={() => this.onPress('https://github.com/joy-yu/toiletReading')}
            />
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container:{
    flex:1,
  },
  top:{
    flex:1,
    alignItems:'center',
  },
  logo: {
  width: 110,
  height: 110,
  marginTop: 50
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
  bottom:{
    alignItems:'center',
    marginBottom:10
  },
  cite:{
    color:'#3e9ce9',
  },
  address:{
    flex:1,
    flexDirection:'row',
  }

});
