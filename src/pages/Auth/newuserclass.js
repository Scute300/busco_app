import axios from 'axios'
import {AsyncStorage} from 'react-native'
import baseurl from '../../globalfunctions/baseurl'

export default class User{
  
    constructor(type , token){
        this.type = type
        this.token = token
      }
  
    async register(){
       const r = await axios.post(baseurl+'v1/login', {
            token:this.token,
            type: this.type
        }).then(response=>{
            return {response : true, token : response.data.token, error: ''}
        }).catch(error =>{
            return {response : false, token : null, error: error.response.data.message !== null ? error.response.data.message : 'No se puede conectar al servidor'}
        })
        if(r.token !== null){
            await AsyncStorage.clear()
            await AsyncStorage.setItem('usertoken', r.token)
        }
        return r
    }

}