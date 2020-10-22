import React from 'react'
import {Container, Content, Text, Header, Left, Body, Icon, Card,
CardItem, Button} from 'native-base'
import {View, StyleSheet, TouchableOpacity } from 'react-native'
import { withOrientation } from 'react-navigation'

export default class Newmarket extends React.Component{
    constructor(){
        super()
        this.state = {
            block : true

        }
    }
    disblockscreen = () =>{
        this.setState({block : false})
    }
    render(){
        return(
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity>
                            <Icon
                            style={styles.icon}
                            type="AntDesign"
                            name="arrowleft"
                            />
                        </TouchableOpacity>
                    </Left>
                    <Body/>
                </Header>
                <View style={styles.vista1}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Newmarketcreate')}}>
                        <View style={styles.circle}>
                            <Icon
                            style={styles.marketbuttonicon}
                            type="FontAwesome5"
                            name="store"
                            />
                            <Text style={styles.marketbuttontext}>
                                Empezar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.blockscreen(this.state.block)}
            </Container>
        )
    }
    blockscreen(block){
        if(block){
            return(
                <View style={styles.vista2}>
                    <View style={styles.vista3}>
                    </View>
                    <View style={styles.cardcontainer}>
                        <Card>
                            <CardItem>
                                    <Text style={styles.text}>
                                    Estás a punto de
                                    crear tu perfil de
                                    negocios, este deberá
                                    aprobarse antes de mostrarse
                                    al publico, Asegurate de estar
                                    en el lugar en el que darás tus
                                    servicios
                                    </Text>
                            </CardItem>
                            <View style={{width : '100%', alignItems :'center'}}>
                                <Button style={styles.header} full onPress={this.disblockscreen}>
                                    <Text>
                                        Entendido
                                    </Text>
                                </Button>
                            </View>
                        </Card>
                    </View>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
 vista1: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center'
 },
 vista2: {
     width: '100%',
     height: '100%',
     position: 'absolute',
     alignItems: 'center',
     justifyContent: 'center',
 },
 vista3: {
     width: '100%',
     height: '100%',
     position: 'absolute',
     backgroundColor: 'black',
     opacity: .40
 },
 header: {
     backgroundColor: '#c8001d'
 },
 icon: {
     fontSize: 36,
     color : 'white',
     marginTop: 15
 },
 cardcontainer :{
     width: '100%',
     paddingHorizontal: 15
 },
 text: {
     textAlign: 'center'
 },
 circle : {
     width: 180,
     height: 180,
     borderRadius: 100,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#c8001d',
     borderWidth: 1,
     borderColor: 'black'
 },
 marketbuttonicon:{
    color: 'white',
    fontSize: 70
 },
 marketbuttontext: {
     fontSize: 10,
     color: 'white',
     fontWeight: 'bold'
 }

})

