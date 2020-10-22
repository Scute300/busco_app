import {AsyncStorage} from 'react-native'
import axios from 'axios'
import  baseurl from '../../globalfunctions/baseurl'

const comprobation = async()=>{
    
    const token = await AsyncStorage.getItem('usertoken')
    console.log(token)
    if(token == null){
        return {response : false}
    } else {
       const r = await axios.get(baseurl+'v2/me',
        {headers: {Authorization: token}, timeout:60000})
        .then(response => {
            return {response: true,
            data: response.data.data, negocio: response.data.negocio}
        }).catch(error =>{
            return {response: 'error'}
        })
        return r
    }
}


export default {comprobation}

