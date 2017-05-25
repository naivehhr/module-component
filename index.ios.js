/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Navigator
} from 'react-native';
import App from './app'
import RefreshList from './RefreshList'
import RefreshFlatList, { RefreshState, ViewType } from 'react-native-refreshflatlist'
import {
  color_text_grey,
  SubmitButton
} from '@faegroup/common/index'
import qs from "qs"
class MyCounter extends Component {
  

  componentDidMount() {
    // console.log('this.Props', this.props.navigator);
    this.cuu = this.props.navigator && this.props.navigator.getCurrentRoutes()
    
  }
  onPress = async () => {
    // const { navigator } = this.props
    // navigator && navigator.push({
    //   name: 'RefreshList',
    //   component: RefreshList
    // })

    let d = await this.getData()
    // console.log(d);
    // console.log('------')
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.cuu == nextProps.navigator.getCurrentRoutes());
    // console.log('this.Props', this.props.navigator.getCurrentRoutes());
    // console.log('nextProps', nextProps.navigator.getCurrentRoutes());
  }
  

  shouldComponentUpdate (nextProps, nextState) {
    if(this.cuu != nextProps.navigator.getCurrentRoutes()){
      return false
    }
    return true
  }
  
  getData = () => {
    let promise = new Promise((resolve, reject) => {
      let meta = {
        method:'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify({
          pageNo: '1',
          pageSize:'10'
        })
      }
      fetch('http://testweb14.wxfaelocal.com:801/api/product/list', meta)
      .then(response => {
        console.log('get response');
        return response.json()
      })
      .then(data => {
        console.log('get data==', data)
        resolve(data)
      })
      .catch(e => {
        console.log("Oops, error", e)
      })
    })
    return promise
  }

  http = () => {
    let meta = {
      method:'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({
        pageNo: '1',
        pageSize:'10'
      })
    }
    fetch('http://testweb14.wxfaelocal.com:801/api/product/list', meta).then(response => response.json())
    .then(data => console.log(data))
    .catch(e => console.log("Oops, error", e))
  }

  _renderItem = ({item}) => {
		return (
			<View>
			 <Button
       onPress={this.onPress}
          title={item + ''}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
			</View>
		)
	}

  render() {
    return (
      <View style={styles.container}>
        <RefreshFlatList
          data={[1,2,3]}
          renderItem={this._renderItem}
          viewType={ViewType.ListView}
        />
      </View>
    );
  }
}

export default class SampleComponent extends React.Component {
    render() {
        let defaultName = 'MyCounter';
        let defaultComponent = MyCounter;
        return (
        <Navigator
          initialRoute={{ name: defaultName, component: defaultComponent }}

          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
          }} />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MyCounter', () => MyCounter);
