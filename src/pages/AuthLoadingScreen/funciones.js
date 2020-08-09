import {AsyncStorage} from 'react-native'
import axios from 'axios'
const baseurl= 'https://buscoapp.herokuapp.com/api/v2/'

const comprobation = async()=>{
    let res = {response : false, }
    const token = await AsyncStorage.getItem('user-token')
    if(token == null){
        return res
    } else {
        await axios.get(baseurl+'me',
        {headers: {Authorization: `Bearer ${token}`}, timeout:60000})
        .then(response => {
            res = {response: true,
            data: response.data.data}
        }).catch(error =>{
            res = {response: 'error'}
        })
        return res
    }
}


export default {comprobation}

