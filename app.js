/*
 * @Author: aran.hu 
 * @Date: 2017-04-25 15:53:11 
 * @Last Modified by: aran.hu
 * @Last Modified time: 2017-04-25 16:12:19
 */
import React, {Component} from 'react'
import {View} from 'react-native'
import { Provider } from 'react-redux';

import { CounterApp } from './app/';
import ConfigureStore from './configureStore'

const store = ConfigureStore()
export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
        <CounterApp />
      </Provider>
		)
	}
}