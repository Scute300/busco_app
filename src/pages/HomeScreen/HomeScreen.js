import React, {Component} from 'react';
import {Container, Content, Icon, Title} from 'native-base'
import {connect} from 'react-redux'
import Navbar from '../../globalfunctions/globalcomponents/navbar'
import { Col, Grid } from 'react-native-easy-grid'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Animated} from 'react-native'
import { StatusBar } from 'expo-status-bar'
let dimension = 0

class HomeScreen extends Component {
    constructor(){
        super();
        this.state = {
            animated : new Animated.Value(0),
            animatedXY : new Animated.ValueXY({x: 0, y:1000}),
            height : 0
        }
        this.animateInterpolate = this.state.animatedXY.y.interpolate({
            inputRange: [0, 100],
            outputRange:[1, 0]
        })
    }
    componentDidMount(){
        setTimeout(()=>{
            Animated.timing(this.state.animatedXY,{
                toValue: {x:0, y: 0},
                duration: 800
            }).start()
        }, 500)
    }
    

    measureView = (event) => {
        const size = event.nativeEvent.layout.height
        dimension = size / 2
        this.setState({height : Math.trunc(dimension)})
    }

    render(){
        return(
            <Container>
            <Navbar
            navigation={this.props.navigation}
            userdata={this.props.userdata}
            />
            
            <Content onLayout={(event) => this.measureView(event)} >
            <Animated.View style={{marginTop : this.state.animatedXY.y, opacity: this.animateInterpolate}}>
                <Grid>
                    <Col style={{ height: this.state.height, backgroundColor : '#c8001d', alignItems:'center',justifyContent:'center', width: '50%'}}>
                        <TouchableOpacity
                        style={{width : '100%'}}>
                            <Icon
                            type='AntDesign'
                            name='upload'
                            style={{fontSize:80, color: 'white'}}
                            />
                            <Title style={{color :'#FFFFFF',fontSize: 13}}>
                                Subir
                            </Title>
                            <Title style={{color :'#FFFFFF', fontSize: 13}}>
                                Negocio
                            </Title>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{ height:this.state.height, alignItems:'center',justifyContent:'center', width: '50%'}}>
                        <TouchableOpacity
                        style={{width : '100%'}}
                        onPress={()=>{
                            let dato = 'Negocios'
                            this.props.navigation.navigate('Drivermap', {dato})
                        }}>
                            <Icon
                            type='AntDesign'
                            name='isv'
                            style={{fontSize:80, color: '#c8001d'}}
                            />
                            <Title style={{color: '#c8001d', fontSize: 13}}>
                                Negocios
                            </Title>
                        </TouchableOpacity>
                    </Col>
                </Grid>
                <Grid>
                    <Col style={{ height:this.state.height, alignItems:'center',justifyContent:'center', width: '50%'}}>
                        <TouchableOpacity
                        style={{width : '100%'}}
                        onPress={()=>{
                            let dato = 'Servicio'
                            this.props.navigation.navigate('Drivermap', {dato})
                        }}>
                            <Icon
                            type='FontAwesome5'
                            name='people-carry'
                            style={{fontSize:80, color: '#c8001d'}}
                            />
                            <Title style={{color: '#c8001d', fontSize: 13}}>
                                Servicios
                            </Title>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{ height:this.state.height, backgroundColor : '#c8001d', alignItems:'center',justifyContent:'center', width: '50%'}}>
                        <TouchableOpacity
                        style={{width : '100%'}}
                        onPress={()=>{
                                let dato = 'vacante'
                                this.props.navigation.navigate('Getallpost', {dato})
                            }}>
                            <Icon
                            type='Fontisto'
                            name='person'
                            style={{fontSize:80, color: 'white'}}
                            />
                            <Title style={{color :'#FFFFFF', fontSize: 13}}>
                                Mi perfil
                            </Title>
                        </TouchableOpacity>
                        </Col>
                </Grid>
                </Animated.View>
            </Content>
            <StatusBar style="light"/>
            </Container>
        )
    }
}

const mapStateToProps = state => {
  return {userdata : state.userdata}
}

export default connect(mapStateToProps)(HomeScreen)