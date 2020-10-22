import React, {Component} from 'react';
import {Thumbnail, Content, Icon} from "native-base"
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-navigation';
import {DrawerItems} from "react-navigation-drawer"
import {connect} from 'react-redux'
import {TouchableOpacity} from 'react-native'
class CustomDrawerContentComponent extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
  }
  

  render() {
    const ripple = TouchableNativeFeedback.Ripple('#adacac', false);
    return (
      <View style={{ flex: 1 }}>

        <ScrollView >
          <ImageBackground style={{
            flex: 1,
            height : '100%',
            width : '100%',
            resizeMode: "cover",
            justifyContent: "center",
            backgroundColor: '#c8001d'}}>
          <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.containHeader}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>{`Hola ${this.props.userdata.userdata.username}`}</Text>
                  <Text style={{ color: '#f9f9f9', fontFamily: 'sans-serif-condensed' }}>{`${this.props.userdata.userdata.email}`}</Text>
                </View>
            </View>
          </SafeAreaView>
            </ImageBackground>
          <DrawerItems
          {...this.props} />
        </ScrollView>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          { this.props.userdata.tienda !== true
          ?
          <TouchableOpacity>
          <View style={styles.columnnegocio}>
              <Icon
              type="MaterialIcons"
              name="store"
              style={{color: 'gray'}}
              />
              <Text style={{color: 'gray'}}>
              {'    '}
                Administrar Negocio
              </Text>
          </View>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate('Newmarket')
          }}>
          <View style={styles.columnnegocio}>
              <Icon
              style={{color: 'gray'}}
              type="AntDesign"
              name="upload"
              />
              <Text style={{color: 'gray'}}>
              {'    '}
                Subir Mi negocio
              </Text>
          </View>
          </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containHeader: {
    paddingTop: '4%',
    paddingBottom: '4%'
  },
  containDrawerOption: {
    paddingLeft: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '1%',
    paddingBottom: '5%',
    backgroundColor: '#e6e6e6',
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    fontWeight: '600',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50
  },
  actionText: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    fontWeight: '600',
    marginRight: '3%',
    marginLeft: '3%',
  },
  closeBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 17,
  },
  closeText: {
    fontFamily: 'sans-serif-medium',
    fontWeight: '600',
    marginRight: '3%',
    marginLeft: '3%',
  },
  columnnegocio: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
const mapStateToProps = state => {
  return {userdata : state.userdata}
}

export default connect(mapStateToProps)(CustomDrawerContentComponent)