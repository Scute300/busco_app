import React, {Component} from 'react';
import {Container,  Header, Left, Body, Icon, Picker, 
Form, Card, CardItem, Input, Spinner, Text,
Footer,Thumbnail, Item, Content} from 'native-base'
import {StyleSheet, 
View, TouchableOpacity, Platform, BackHandler} from 'react-native'
import functions from './functions'
import Toast, {DURATION} from 'react-native-easy-toast'
import Post from '../../globalfunctions/globalcomponents/Post'
import { WebView } from 'react-native-webview';


export default class Listcurriculum  extends Component{
    constructor(){
        super()
        this.state = {
            cvs:[],
            page:0,
            loadmore: true


        }
    }

    async componentDidMount(){
        await this.props.navigation.addListener(
        'willFocus',
        async() => {
            this.refresh()
            await this.getcvs()
        })
    }

    getcvs = async()=>{
        setTimeout(async()=>{
            if(this.state.active === true){
                this.setState({active: false, loadmore: true})
                if(this.state.active === false){
                    this.setState(prevState => ({ page: prevState.page + 1 }));
                    const allposts = await functions.getcvs(this.state.page)                                         
                    switch(allposts.response){
                        case true :
                            let arr = allposts.data 
                            if(Array.isArray(arr) && arr.length){
                                let push = this.state.cvs.concat(arr)
                                this.setState({cvs : push, active: true, loadmore: false})
                            }
                        break    
                    }
                }
            }

        }, 1000)
    }

    // se regresan los datos a su estado original    
    refresh = async() =>{
        await this.setState({
            cvs : [],
            active: true,
            loadmore: true,
            page: 0,
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
                    {this.profecionals(this.state.cvs)}
                </Content>
                {this.myfooter(this.state.loadmore)}
            </Container>
        )
    }

    profecionals(cvs){
        if(cvs.length !== 0 ){
            return cvs.map((data) => {
                return(
                    <Card>
                        <CardItem>
                        <Left>
                            <Thumbnail source={{uri: data.avatar}} />
                            <Body>
                            <Text>{data.username}</Text>
                            <Text note>{data.name}</Text>
                            </Body>
                        </Left>
                        </CardItem>
                        <CardItem>
                            <Text>{data.bio}</Text>
                        </CardItem>
                        <Card transparent style={{alignItems : 'center'}}>
                            <TouchableOpacity
                            onPress={()=> {
                                this.refresh()
                                let dato = data.id
                                this.props.navigation.navigate('Curriculum', {dato})
                            }}
                            >
                                <Icon
                                type="Entypo"
                                name="eye"
                                style={{color: '#c8001d'}}
                                />
                            </TouchableOpacity>
                        </Card>
                    </Card>
                )
            })
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
        backgroundColor: 'white'
    },
    icons :{
        color : '#c8001d'
    }
})