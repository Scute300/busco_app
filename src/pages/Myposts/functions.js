import axios from 'axios'
import {AsyncStorage} from 'react-native'

const myposts = async(page)=> {
    const token = await AsyncStorage.getItem('user-token')
    
    let r= {response : false}

    await axios.get('https://buscoapp.herokuapp.com/api/v2/post/myposts/'+page,
    {headers: {Authorization: `Bearer ${token}`}, timeout:60000})
    .then(response => {
        r= {response: true, data :response.data.data}
    }).catch(error =>{
        r= {response : false, data: error.response.data.message}
    })

    return r
}


export default{myposts}