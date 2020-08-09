import React , {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  AsyncStorage,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native'
import {Spinner, Container, Header, Left, 
Body, Right, Text, Icon,Title} from 'native-base'



export default class Navbar extends Component{
    constructor(){
        super()
        this.state ={

        }
    }
    render(){
        return(
            
            <Header style={styles.header}>
                {this.bars(this.props.userdata.isonline)}
                <Right>
                    <Image
                    style={styles.logo}
                    source={require('../../../assets/logo.png')}
                    />
                </Right>
            </Header>
        )
    }
    bars(status){
        if(status == true) {
            return(
                <Left>
                    <TouchableOpacity
                    onPress={()=>{this.props.navigation.toggleDrawer()}}
                    >
                        <Icon
                        style={styles.icon}
                        type={'FontAwesome'}
                        name={'bars'}
                        />
                    </TouchableOpacity>
                </Left>
            )
        }else{
            return(
            <Left>
                <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Auth')
                }}>
                    <Title style={styles.icon}>Login</Title>
                </TouchableOpacity>
            </Left>
            )
        }
    }
}

const styles = StyleSheet.create({
    header :{
        backgroundColor: 'transparent',
    },
    logo : {
        height: 60,
        width: 100
    },
    icon: {
        color : '#c8001d'
    }
})