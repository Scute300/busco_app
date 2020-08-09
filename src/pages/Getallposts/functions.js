import axios from 'axios'


const getposts = async(category, page)=>{
    let r = {response : false}

    await axios.get('https://buscoapp.herokuapp.com/api/v1/posts/'+category,{
        params: {
            foo: page
        }
    }).then(response =>{
        r = {response : true, data : response.data.data}
    }).catch(error=> {
        r= {response : false, data : error.response.data.message}
    })

    return r
}

const getfindpost = async(type, status ,category, price, page, find, advancesearch) =>{
    let r = {response : false}

    await axios.post('https://buscoapp.herokuapp.com/api/v1/find',{
        type: type,
        category: category,
        precio: price,
        status: status,
        page: page, 
        find : find,
        advancesearch: advancesearch
    }).then(response => {
        r={response : true, data: response.data.data}
    }).catch(error => {
        r={response : false}
    })

    return r
}

export default {getposts, getfindpost}