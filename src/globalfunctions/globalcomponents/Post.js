import React, {Component} from 'react';
import {Content, 
Left, Body, Icon, Text, Card, CardItem,
Thumbnail} from 'native-base'
import {TouchableOpacity, Image} from 'react-native'

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

export default class Getallposts extends Component{
    constructor(){
        super();
        this.state ={

        }
    }
    render(){
        return(
            <Content
            onScroll={async({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        if(this.props.find == false && this.props.posts.length >= 3){
                           await this.props.load();
                        }else if(this.props.find == true && this.props.posts.length > 3){
                           await this.props.refreshfind()
                        }
                    }
            }}
            style={{marginTop : 10}}>
                {this.postmap(this.props.posts)}
            </Content>    
        )
    }
    postmap(values){
        if(values .length !== 0){
        return values.map((data) => {
            return (
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: data.avatar}} />
                            <Body>
                            <Text>{data.username}</Text>
                            <Text note>{data.location}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Text>
                            {data.postname}
                        </Text>
                    </CardItem>
                    {this.category(data.type, data)}
                    <CardItem cardBody>
                        <Image source={{uri: data.image}} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <Card transparent style={{alignItems : 'center'}}>
                        <TouchableOpacity
                        onPress={()=> {
                            this.props.refresh()
                            let dato = data.id
                            this.props.navigation.navigate('Getpost', {dato})
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
        })}
    }
    category(status, options){
        if(status == 'listado'){
            return(
                <Card transparent>
                    <CardItem>
                        <Left>
                            <Body>
                            <Text note>{options.status}</Text>
                            <Text note>{options.category}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Body>
                            <Text note>{options.price}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            )
        }else if(status == 'negocio' || 'servicio'){
            return(
                <Card transparent>
                    <CardItem>
                        <Left>
                            <Body>
                            <Text note>{options.category}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
                )
        } else if(status == 'vacante'){
            return(
                <Card transparent>
                    <CardItem>
                        <Left>
                            <Body>
                            <Text note>{options.price}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            )
        }
    }
}