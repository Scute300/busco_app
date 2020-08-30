import React, {Component} from 'react';
import {Container,  Header, Left, Body, Icon, 
    Card, CardItem, Spinner, Text,
Footer,Thumbnail, Content} from 'native-base'
import {StyleSheet,  TouchableOpacity} from 'react-native'
import functions from './functions'
import {connect} from 'react-redux'
import { StatusBar } from 'expo-status-bar'


class Curriculum extends Component{
    constructor(){
        super()
        this.state = {
            cv:null,
            loadmore : false,
            curriculo:null
        }
    }

    async componentDidMount(){
        await this.props.navigation.addListener(
        'willFocus',
        async() => {
            this.refresh()
            await this.getcv()
        })
    }

    getcv = async()=>{
        setTimeout(async()=>{
            if(this.state.loadmore == false){
                this.setState({loadmore : true})
                const cv = await functions.getcv(this.props.navigation.state.params.dato)
                switch(cv.response){
                    case true:
                        this.setState({cv: cv.data, loadmore : false, curriculo: cv.data.curriculo})
                    break
                }
            }
        }, 1000)
    }

    abrircv = async() =>{
        const download = await functions.downloadcurriculum(this.state.curriculo.cvlink)

    }

    // se regresan los datos a su estado original    
    refresh = async() =>{
        await this.setState({
            cvs : null,
            loadmore: false,
            curriculo: null
        })
    }

    render(){
        return(
            <Container>
            <Header style={styles.header}>
                <Left>
                    <TouchableOpacity
                    onPress={()=>{
                        this.refresh()
                        this.props.navigation.navigate('Home')}}>
                        <Icon
                        type="Ionicons"
                        name="arrow-back"
                        style={styles.icons}
                        />
                    </TouchableOpacity>
                </Left>
                <Body></Body>
            </Header>
                <Content>
                    {this.profecionals(this.state.cv)}
                </Content>
                {this.myfooter(this.state.loadmore)}
                <StatusBar style="light" />
            </Container>
        )
    }

    profecionals(cv){
        if(cv !== null ){
                return(
                    <Card>
                        <CardItem>
                        <Left>
                            <Thumbnail source={{uri: cv.avatar}} />
                            <Body>
                            <Text note>{cv.name}</Text>
                            <Text>{cv.email}</Text>
                            </Body>
                        </Left>
                        </CardItem>
                        <CardItem>
                            <Text note>{cv.bio}</Text>
                        </CardItem>
                        <Card 
                        style={{alignItems : 'center'}}
                        transparent>
                            <TouchableOpacity
                            onPress={this.abrircv}>
                                <Icon
                                style={styles.icons}
                                type="Entypo"
                                name="download"
                                />
                            </TouchableOpacity>
                            <Text style={styles.icons}>Descargar este curriculum</Text>
                        </Card>
                        {this.reportlink(this.state.cv.id)}
                    </Card>
                )
            }
    }

    reportlink(uid){
        if(uid == this.props.userdata.userdata.id && this.props.userdata.isonline == true){
            return(
                <Card style={{alignItems:'center'}} transparent>
                    <TouchableOpacity
                    onPress={()=>{
                        let dato = this.state.curriculo.id
                        this.props.navigation.navigate('Cvreport', {dato})
                    }}
                    >
                        <Text>Reportar</Text>
                    </TouchableOpacity>
                </Card>
            )
        }
    }

    myfooter(load){
        if(load == true){
            return(
                <Footer style={{alignItems: 'center', backgroundColor: 'transparent'}}>
                    <Spinner color="red"/>
                </Footer>
            )
        }
    }
}


const styles = StyleSheet.create({
    header : {
        backgroundColor: '#c8001d',
        marginTop: 9
    },
    icons :{
        color : 'white',
        marginTop: 9
    }
})

const mapStateToProps = state => {
    return {userdata : state.userdata}
  }
  
export default connect(mapStateToProps)(Curriculum)