import * as React from 'react';
import {Content, Container, Text, Icon, Header, Left, Body} from 'native-base';
import { StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import Navbar from '../../globalfunctions/globalcomponents/navbar'
import MapView, {Marker} from 'react-native-maps';
import { StatusBar } from 'expo-status-bar'
import global from '../../globalfunctions/global'
import {connect} from 'react-redux'



class Drivermap1 extends React.Component{
    constructor(){
        super()
        this.state={
            size: 0,
            isblock: true,
            lat: 0,
            lng: 0 
        }
    }

    UNSAFE_componentWillMount(){
        
    }

    measureview(event){
        const size = event.nativeEvent.layout.height
        this.setState({size : size})
    }

    startmapmode = async()=>{
        const definemode = await global.location()
        switch (definemode.response){
            case true : 
                this.setState({lat: definemode.lat, lng: definemode.lng, isblock: false})
            break
            case false :
                this.setState({isblock: true})
            break
        }
    }

    render(){
        return(
            <Container>
                <View
                style={{flex: 1, width : '100%'}}
                onLayout={(event) => this.measureview(event)} >
                    <MapView
                    region={{
                        latitude: this.state.lat,
                        latitudeDelta:0.001,
                        longitude: this.state.lng,
                        longitudeDelta: 0.001,}}
                    style={{position:'absolute',width: '100%', height: this.state.size}}>
                        { this.state.lat !== 0 && this.state.lng !== 0 
                        ?
                        <Marker
                        coordinate={{
                            latitude: this.state.lat, 
                            longitude: this.state.lng}}
                            title='Yo'
                            description='Mi ubicación'
                        />
                        :
                        null
                        }
                    </MapView>
                    <Navbar
                    navigation={this.props.navigation}
                    userdata={this.props.userdata}
                    />
                    {this.buttonblock(this.state.isblock)}
                </View>
            </Container>
        )
    }

    buttonblock(isblock){
            if(isblock){
                return(
                    <View style={styles.blockscreen}>
                        <View style = {styles.buttoncontainer}>
                            <TouchableOpacity
                            onPress={()=>{this.startmapmode()}}>
                                <View style={styles.button}>
                                    <Icon
                                    style={{color: 'white'}}
                                    type="Feather"
                                    name="power"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
    }

}

const styles = StyleSheet.create({
    blockscreen:{
        flex : 1,
        backgroundColor: 'black',
        opacity: .80,
        width: '100%',
        justifyContent: 'flex-end',
        paddingVertical: 20
    },
    header :{
        backgroundColor: '#c8001d' 
    },
    buttoncontainer: {
        width: '100%',
        alignItems: 'center'
    },
    button:{
        alignItems: 'center',
        width: 90, 
        height: 90, 
        backgroundColor: '#c8001d', 
        borderRadius: 90,
        justifyContent: 'center',
        bottom: 15
    },
    icon: {
        fontSize: 36,
        color : 'white',
        marginTop: 15
    }
})


const mapStateToProps = state => {
    return {userdata : state.userdata}
  }
  
  export default connect(mapStateToProps)(Drivermap1)