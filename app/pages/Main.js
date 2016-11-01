import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Navigator,
} from 'react-native';
import BaozouPage from './BaozouPage';
import ReadPage from './ReadPage';
import NewsPage from './NewsPage';
import AboutPage from './AboutPage';
import WechatPage from './WechatPage';
import FacebookTabBar from '../components/FacebookTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';


export default class reactnative extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      
      <ScrollableTabView
        renderTabBar={() => <FacebookTabBar/>}
        tabBarPosition='bottom'
        locked={true}>

        <View tabLabel='ios-paper 阅读' style={styles.container}>
          <ReadPage/>
        </View>

        <View tabLabel='ios-chatboxes 今日头条' style={styles.container}>
          <Navigator
            initialRoute={{ name: NewsPage, component: NewsPage }}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return <Component {...route.params} navigator={navigator} />
            }} />
        </View>

        <View tabLabel='ios-book 微信精选' style={styles.container}>
          <Navigator
            initialRoute={{ name: WechatPage, component: WechatPage }}
            renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
            }} />
        </View>

        <View tabLabel='ios-people 神吐槽' style={styles.container}>
          <BaozouPage/>
        </View>

        <View tabLabel='ios-notifications 关于' style={styles.container}>
          <AboutPage />
        </View>

      </ScrollableTabView>

     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});

