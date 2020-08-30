import axios from 'axios'
import * as WebBrowser from 'expo-web-browser';

const getcvs = async(page)=>{
    let r = {response : false}
    await axios.get('https://buscoapp.herokuapp.com/api/v1/curriculums/'+page)
    .then(response => {
        r = {response : true, data: response.data.data.data}
    }).catch(error => {
        r = {response: false, data: error.response.data}
    })

    return r
}
const getcv = async(id)=>{
    let r = {response : false}
    await axios.get('https://buscoapp.herokuapp.com/api/v1/curriculum/'+id)
    .then(response => {
        r = {response : true, data: response.data.data[0]}
        console.log(r)
    }).catch(error => {
        r = {response: false, data: error.response.data}
    })

    return r
}

const downloadcurriculum = async(source)=>{
    let result = await WebBrowser.openBrowserAsync(source);
}

export default {getcvs, getcv, downloadcurriculum}