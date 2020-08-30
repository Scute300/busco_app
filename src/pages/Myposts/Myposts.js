import React, {Component} from 'react';
import {Container, Spinner,
Footer} from 'native-base'
import functions from './functions'
import Toast, {DURATION} from 'react-native-easy-toast'
import Post from '../../globalfunctions/globalcomponents/Post'
import Navbar from '../../globalfunctions/globalcomponents/navbar'
import {connect} from 'react-redux'
import { StatusBar } from 'expo-status-bar'

class Myposts extends Component{
    constructor(){
        super()
        this.state={
            posts : [],
            active : true,
            loadmore: false,
            page: 0,
        }
    }

    async componentDidMount(){
        await this.props.navigation.addListener(
        'willFocus',
        async() => {
            this.refresh()
            await this.getposts()
        })
    }


    getposts = async()=>{
        setTimeout(async()=>{
            if(this.state.active === true){
                this.setState({active: false, loadmore: true})
                if(this.state.active === false){
                    this.setState(prevState => ({ page: prevState.page + 1 }));
                    const allposts = await functions.myposts(this.state.page)                                         
                    switch(allposts.response){
                        case true :
                            let arr = allposts.data 
                            if(Array.isArray(arr) && arr.length){
                                let push = this.state.posts.concat(arr)
                                this.setState({posts : push, active: true, loadmore: false})
                            }
                        break    
                    }
                }
            }

        }, 1000)
    }
    refresh = async() =>{
        await this.setState({
            posts : [],
            active: true,
            loadmore: false,
            page: 0,
        })
    }
    render(){
        return(
            <Container>
                <Navbar
                navigation={this.props.navigation}
                userdata={this.props.userdata}
                />
                    <StatusBar style="light" />
                    {this.posts()}
                    <Toast ref="toast"/>
                    {this.footer()}
            </Container>
        )
    }
    posts(){
        if (this.state.posts.length !== 0){
            return(
                <Post
                navigation={this.props.navigation}
                load={this.getposts.bind(this)}
                posts={this.state.posts}
                find={false}
                />

            )
        }
    }
    footer(){
        if(this.state.loadmore == true){
            return(
                <Footer style={{justifyContent: "center", alignItems: 'center', backgroundColor : 'transparent'}}>
                <Spinner color="red"></Spinner>
                </Footer>
            )
        }
    }
}

const mapStateToProps = state => {
  return {userdata : state.userdata}
}

export default connect(mapStateToProps)(Myposts)