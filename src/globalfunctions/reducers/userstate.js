export default (state = {isonline: false, tienda: false, userdata : {
username: 'invitado', email : 'Bienvenido'}}, action) => {
    switch(action.type){
        case 'OnUserSession':
            return action.payload
        default :
        return state
    }
}