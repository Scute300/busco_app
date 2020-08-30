import React , {Component} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import {Header, Left, 
Right, Icon,Title} from 'native-base'



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
                    source={require('../../../assets/logowhite.png')}
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
        backgroundColor: '#c8001d' 
    },
    logo : {
        height: 60,
        width: 100, 
        marginTop: 20
    },
    icon: {
        color : 'white', 
        marginTop: 20
    }
})