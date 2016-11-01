import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  View,
  TouchableOpacity,
} from 'react-native';


export default class ReadPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title:'',
      author:'',
      main:[],
      loaded: false,
      isRefreshing:false,
    };
  }

  componentWillMount() {
    fetch('http://123.206.211.247:6789')
      .then((res) => res.json())
      .then((resData) => {
        this.setState({loaded: true,...resData});
      })
      .catch((err)=>console.error(err));
  }

  getRandom(){
    if(this.refs._scrollView){
      this.refs._scrollView.scrollTo({y: 0, animated: false});
    }
    this.setState({loaded: false});
    fetch('http://123.206.211.247:6789/random')
      .then((res) => res.json())
      .then((resData) => {
        this.setState({isRefreshing: false,loaded:true,...resData});

      })
      .catch((err)=>console.error(err));
  }

  onRefresh() {
    this.setState({isRefreshing: true});
    this.timer = setTimeout(() => {
      this.setState({
        isRefreshing: false,
      });
    }, 5000);
    this.getRandom();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  renderLoadingView() {
    return (
      <ScrollView
        contentContainerStyle={styles.loadbox}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}/>
        }
      >
        <Text>
          加载中...
        </Text>
      </ScrollView>
    );
  }

  render(){

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (

      <ScrollView
        style={styles.container}
        ref='_scrollView'
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}/>
        }
      >
      
        <Text style={styles.title}>{this.state.title}</Text>
        <Text style={styles.author}>{this.state.author}</Text>
        
        <View style={styles.main}>
          {
            this.state.main.map((v,i)=>{
              return (
                <Text key={i} style={styles.text}>{'        ' + v}</Text>
              );
            })
          }
        </View>
        
        <TouchableOpacity onPress={this.getRandom.bind(this)} style={styles.buttonArea}>
          <Text style={styles.button}>
            随机一篇
          </Text>
        </TouchableOpacity>

      </ScrollView>

    );
  }

}

const styles = StyleSheet.create({
  loadbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container:{
    flex:1,
    paddingHorizontal:18,
  },

  title:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
    marginBottom:10,
    paddingTop:30,
  },

  author:{
    textAlign:'center',
    fontWeight:'bold',
    borderBottomWidth:1,
    paddingBottom:10,
    borderBottomColor:'#736357',
  },

  main:{
    marginVertical:18,
  },

  text:{
    fontSize:18,
    marginVertical:7,
    lineHeight:30,
    textAlign:'justify'
  },

  buttonArea:{
    alignSelf:'center',
    marginBottom:50,
  },
  button:{
    fontSize:18,
    backgroundColor:'#1AAD19',
    color:'#fff',
    borderRadius:5,
    paddingHorizontal:14,
    paddingVertical:10
  }

});

