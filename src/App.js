import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './globalfunctions/reducers'
import {createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import {Icon} from 'native-base'

import CustomDrawerContentComponent from './globalfunctions/globalcomponents/menu'
import HomeScreen from './pages/HomeScreen/HomeScreen'
import AuthLoading from './pages/AuthLoadingScreen/AuthLoading'
import Login from './pages/Auth/login'
import Update from './pages/updateprofile/updateprofile'
import Aoptions from './pages/updateprofile/advanceoptions'
import Report from './pages/Report/Report'
import Termns from './pages/Auth/termandconditions'
import Drivermap from './pages/Map/Map'
const LoginStack = createStackNavigator({
    Login : {
        screen : Login
    },
    Termns : {
      screen : Termns
    }
},{headerMode : 'none'})


const DrawerStack = createDrawerNavigator({
    Home :{
        screen : HomeScreen,
        navigationOptions :{
            drawerLockMode : 'locked-closed',
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
              type='FontAwesome5'
              name='home'
              style={{fontSize:20, color : tintColor}}
              />),
        }
    },
    Modificar:{
      screen : Update,
      navigationOptions :{
          drawerLockMode : 'locked-closed',
          unmountInactiveRoutes: true,
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
            type='FontAwesome5'
            name='user-edit'
            style={{fontSize:20, color : tintColor}}
            />),
      }
    },
    Aoptions : {
      screen : Aoptions,
      navigationOptions: {
          drawerLockMode : 'locked-closed',
          drawerLabel : () =>  null
      }
    },
    Report : {
      screen : Report,
      navigationOptions: {
          drawerLockMode : 'locked-closed',
          drawerLabel : () =>  null
      }
    },
      Drivermap : {
      screen : Drivermap,
      navigationOptions: {
          drawerLockMode : 'locked-closed',
          drawerLabel : () =>  null
      }
    }
},
{
  drawerPosition: 'left',
  contentOptions : {
    unmountInactiveRoutes: true,
    activeTintColor:'#ffffff',
    inactiveTintColor : '#c8001d',
    activeBackgroundColor : '#c8001d', 
    inactiveBackgroundColor: '#ffffff',
    headerMode: 'none'
  },
  contentComponent:
    CustomDrawerContentComponent 
}) 

const Aplicacion = createAppContainer(
    createSwitchNavigator(
      {
        AuthLoading: AuthLoading,
        App: DrawerStack,
        Auth : LoginStack
      },
      {
        initialRouteName: 'AuthLoading'
      }
    )
)


export default class Myapp extends Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log('hola mundo')
        return(
            <Provider store={createStore(reducers)}>
            <Aplicacion/>
            </Provider>
        )
    }

}




