import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Navigator,
} from 'react-native';
import BaozouPage from './pages/BaozouPage';
import ReadPage from './pages/ReadPage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import WechatPage from './pages/WechatPage';
import Splash from './pages/Splash';
import FacebookTabBar from './components/FacebookTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';


export default class reactnative extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderScene(route, navigator) {
    const Component = route.component;
    return (
      <Component navigator={navigator} route={route} />
    );
  }

  render() {
 
      
     return (
      <View style={styles.container}>
        <Navigator
          style={{flex:1}}
          renderScene={this.renderScene}
          initialRoute={{
            component: Splash,
            name: 'Splash'
          }}
        />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
  },
});

