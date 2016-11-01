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

export default class WechatPage extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds,
      loaded: false,
      isRefreshing: false,
    };
    this._data = [];
    this._nextNum = 2;
  }

  componentWillMount(){
    this.fetchData();
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
        {
        item.firstImg?
        <Image
          source={{uri: item.firstImg}}
          style={styles.thumbnail}
        />
        :<Text style={styles.thumbText}>并没有什么图片</Text>
        }
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.rightBottomContainer}>
            <Text style={styles.author}>{item.source}</Text>
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
              params:{url:item.url, author:item.source}
          })
      }
  }

  fetchData(num){
    if(num){
      this._nextNum++;
    }
    let url = `http://v.juhe.cn/weixin/query?pno=${num}&key=1b36eea0ae74c4b23c217f2980953976`;
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        this._data = this._data.concat(resData.result.list);
        this.setState({
          ds: this.state.ds.cloneWithRows(this._data),
          loaded: true,
          isRefreshing: false,
        });
      })
      .catch((err)=>console.error(err));
  }

  render(){

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.ds}
        renderRow={this.renderItem.bind(this)}
        style={{backgroundColor:'#fff'}}
        showsVerticalScrollIndicator={false}
        initialListSize={10}
        onEndReached={()=>setTimeout(this.fetchData.bind(this,this._nextNum),500)}//this.fetchData(this._nextNum)}
        onEndReachedThreshold={10}
      />
    );
  }

}

const styles = StyleSheet.create({
  loadbox: {
    flex: 1,
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
    padding:10,
  },
  rightContainer: {
    flex: 1,
    paddingLeft:10,
  },
  rightBottomContainer:{
    flex: 1,
    flexDirection:'row',
    alignItems:'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color:'#000',
  },
  author:{
    flex:1,
    color:'#6cf',
    textAlign:'left'
  },
  thumbnail: {
    width: 100,
    height: 75,
  },
  thumbText:{
    width: 100,
    height: 75,
    fontSize:12,
  },

});
