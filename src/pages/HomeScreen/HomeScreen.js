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
        dimension = size / 3
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
                    <Col style={{ height: this.state.height, backgroundColor : '#c8001d', alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity
                            onPress={()=>{
                                let dato = 'listado'
                                this.props.navigation.navigate('Getallpost', {dato})
                            }}>
                            <Icon
                            type='FontAwesome5'
                            name='list'
                            style={{fontSize:80, color: 'white'}}
                            />
                            <Title style={{color :'#FFFFFF'}}>
                                Listados
                            </Title>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{ height:this.state.height, alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity
                        onPress={()=>{
                            let dato = 'negocio'
                            this.props.navigation.navigate('Getallpost', {dato})
                        }}>
                            <Icon
                            type='AntDesign'
                            name='isv'
                            style={{fontSize:80, color: '#c8001d'}}
                            />
                            <Title style={{color: '#c8001d', fontSize: 16}}>
                                Negocios
                            </Title>
                        </TouchableOpacity>
                    </Col>
                </Grid>
                <Grid>
                    <Col style={{ height:this.state.height, alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity
                        onPress={()=>{
                            let dato = 'servicio'
                            this.props.navigation.navigate('Getallpost', {dato})
                        }}>
                            <Icon
                            type='FontAwesome5'
                            name='people-carry'
                            style={{fontSize:80, color: '#c8001d'}}
                            />
                            <Title style={{color: '#c8001d'}}>
                                Servicios
                            </Title>
                            <Title style={{color: '#c8001d', fontSize: 16}}>
                                Profesionales
                            </Title>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{ height:this.state.height, backgroundColor : '#c8001d', alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity
                        onPress={()=>{
                                let dato = 'vacante'
                                this.props.navigation.navigate('Getallpost', {dato})
                            }}>
                            <Icon
                            type='Fontisto'
                            name='person'
                            style={{fontSize:80, color: 'white'}}
                            />
                            <Title style={{color :'#FFFFFF', fontSize: 16}}>
                                Empleos
                            </Title>
                        </TouchableOpacity>
                        </Col>
                </Grid>
                <Grid>
                    <Col style={{height: this.state.height, backgroundColor : '#c8001d' , alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.navigate('Curriculums')
                            }}>
                            <Icon
                            type='Fontisto'
                            name='persons'
                            style={{fontSize:80, color :'white'}}
                            />
                            <Title style={{fontSize:16, color :'#FFFFFF', fontSize: 15}}>
                                Curriculums
                            </Title>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{height:this.state.height, alignItems: 'center', justifyContent: 'center'}}> 
                    <TouchableOpacity
                            onPress={()=>{
                                if(this.props.userdata.isonline == true){
                                    this.props.navigation.navigate('Newpost')
                                }else {
                                    this.props.navigation.navigate('Auth')
                                }
                            }}>
                            <Icon
                            type='AntDesign'
                            name='form'
                            style={{fontSize:80, color: '#c8001d'}}
                            />
                            <Title style={{color: '#c8001d'}}>
                                Publicar
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