import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FacebookTabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  render() {
    return (
      <View style={styles.tabs}>

        {this.props.tabs.map((tab, i) => {
          let tabLabel = tab.split(' ')[0];
          let tabName = tab.split(' ')[1];

          return (
            <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
              {tabName?
              <Icon
                name={tabLabel}
                size={30}
                color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
                ref={(icon) => { this.tabIcons[i] = icon; }}
              />
              :<Text>{tabLabel}</Text>
              }
              <Text>{tabName}</Text>
            </TouchableOpacity>
          );

        })}

      </View>
    );
  },
});

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    borderTopWidth:1,
    borderTopColor:'rgba(208,208,208,0.5)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical:5,
  },

});

export default FacebookTabBar;
