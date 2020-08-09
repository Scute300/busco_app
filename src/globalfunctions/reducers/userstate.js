export default (state = {isonline: false, userdata : {
username: 'invitado', email : 'Bienvenido', avatar: 'https://res.cloudinary.com/scute/image/upload/v1595981235/recursos/30-307416_profile-icon-png-image-free-download-searchpng-employee_ogifkm.png'}}, action) => {
    switch(action.type){
        case 'OnUserSession':
            return action.payload
        default :
        return state
    }
}