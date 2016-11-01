import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  Image,
} from 'react-native';
import WebViewPage from './WebViewPage';
import FacebookTabBar from '../components/FacebookTabBar';
import ScrollableTabView,{ ScrollableTabBar, } from 'react-native-scrollable-tab-view';

export default class NewsPage extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds,
      loaded: false,
    };
  }

  componentWillMount(){
    this.fetchData('top');
  }

  renderLoadingView() {
    return (
      <View style={styles.loadbox}>
        <Text>
          加载中...
        </Text>
      </View>
    );
  }

  renderItem(item) {
    return (
      <TouchableOpacity style={styles.container} onPress={this._pressButton.bind(this,item)}>
        <Image
          source={{uri: item.thumbnail_pic_s}}
          style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.rightBottomContainer}>
            <Text style={styles.author}>{item.author_name}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  }
  _pressButton(item) {
      const { navigator } = this.props;
      if(navigator) {
          navigator.push({
              name: 'WebViewPage',
              component: WebViewPage,
              params:{url:item.url, author:item.author_name}
          })
      }
  }

  fetchData(ref){
    let url = `http://v.juhe.cn/toutiao/index?type=${ref}&key=454a6ff4a6673e434d890f5e7acb8331`;
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        this.setState({
          ds: this.state.ds.cloneWithRows(resData.result.data),
          loaded: true,
        });
      })
      .catch((err)=>console.error(err));
  }

  render(){

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (

        <ScrollableTabView
          tabBarPosition='top'
          tabBarBackgroundColor='#fff'
          initialPage={0}
          tabBarActiveTextColor='#3e9ce9'
          tabBarUnderlineStyle={{borderBottomWidth:4,borderBottomColor:'#3e9ce9'}}
          renderTabBar={() => <ScrollableTabBar />}
          onChangeTab={(obj)=> this.fetchData(obj.ref.props.dataType)}
          locked={true}>

          <ListView tabLabel='头条' dataType='top'
            dataSource={this.state.ds}
            renderRow={this.renderItem.bind(this)}
            style={{backgroundColor:'#fff'}}
            initialListSize={10}
          />
     
          <ListView tabLabel='社会' dataType='shehui'
            dataSource={this.state.ds}
            renderRow={this.renderItem.bind(this)}
            style={{backgroundColor:'#fff'}}
            initialListSize={10}
          />

          <ListView tabLabel='国内' dataType='guonei'
            dataSource={this.state.ds}
            renderRow={this.renderItem.bind(this)}
            style={{backgroundColor:'#fff'}}
            initialListSize={10}
          />

          <ListView tabLabel='国际' dataType='guoji'
            dataSource={this.state.ds}
            renderRow={this.renderItem.bind(this)}
            style={{backgroundColor:'#fff'}}
            initialListSize={10}
          />

          <ListView tabLabel='娱乐' dataType='yule'
            dataSource={this.state.ds}
            renderRow={this.renderItem.bind(this)}
            style={{backgroundColor:'#fff'}}
            initialListSize={10}
          />
     
          <ListView tabLabel='体育' dataType='tiyu'
            dataSource={this.state.ds}
            renderRow={this.renderItem.bind(this)}
            style={{backgroundColor:'#fff'}}
            initialListSize={10}
          />
    
          <ListView tabLabel='军事' dataType='junshi'
            dataSource={this.state.ds}
            renderRow={this.renderItem.bind(this)}
            style={{backgroundColor:'#fff'}}
            initialListSize={10}
          />
     
          <ListView tabLabel='财经' dataType='caijing'
            dataSource={this.state.ds}
            renderRow={this.renderItem.bind(this)}
            style={{backgroundColor:'#fff'}}
            initialListSize={10}
          />
        
      </ScrollableTabView>
    );
  }

}

const styles = StyleSheet.create({
  loadbox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  header:{
    height:50,
    backgroundColor:'#3e9ce9',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
    padding:10
  },
  rightContainer: {
    flex: 1,
    paddingLeft:10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color:'#000',
  },
  rightBottomContainer:{
    flex: 1,
    flexDirection:'row',
    alignItems:'flex-end',
  },
  author:{
    flex:1,
    color:'#6cf',
    textAlign:'left',
  },
  date:{
    color:'#aaa',
    textAlign:'right',
    fontSize:12
  },
  thumbnail: {
    width: 100,
    height: 75,
  },

});
