var jwt = require('jsonwebtoken');
const models = require('../models');

const checkToken = async(token) => {
    //Update token to an active one if the one parsed is not active anymore
    let localID = null;
    try {
        const { id } = await token.decode(token);
        localID = id;
    } catch (error) {
        // If the error is not because the token is old
        return false;
    }
    const user = await models.Usuario.findOne({where: {
        id : id,
        //estado: 1
    }});
    if (user){
        const token = this.encode(user);
        return token;
    }else{
        return false
    }
}

module.exports = {
    encode: async(user) => {
    //Second argument 'config.secret' is a secret key to encrypt the token
    const token = jwt.sign({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            estado: user.estado
        }, 'config.secret',{
            expiresIn: 86400, //seconds, i.e. 1hour
        });
        return token
    },
    decode: async(token) => {
        try {
            //Object deconstruction, gets token.id, token.name, token.email, token.rol
            const { id, nombre, email, rol } = await jwt.verify(token, 'config.secret');
            //Get a user whose id corresponds with that of the token and they are active
            //return false if no such user is in our db
            // console.log(id);
            // console.log(nombre);
            // console.log(email);
            // console.log(rol);
            const user = models.Usuario.findOne({where: {
                id : id
                //estado : 1
            }});
            if(user){
                // console.log("User found!");
                return user
            }else{
                // console.log("No user found");
                return false
            }
        } catch (error) {
            // console.log("Error found on token decoding");
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}

// module.exports = {

//     //generar el token
//     encode: async(id, rol) => {

//     },
//     //permite decodificar el token
//     decode: async(token) => {
//         try {

//         } catch (e) {

//         }

//     }
// }