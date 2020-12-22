//The middleware can verify if the user has access to perform a certain action
const tokenServices = require('../services/token')

module.exports = {
    verificarAdministrador: async(req, res, next) => {
        if(!req.headers.token){
            return res.status(404).send({
                message: 'Token no encontrado'
            });
        }else{
            const validationResponse = await tokenServices.decode(req.headers.token);
            if(validationResponse.rol === 'Administrador'){
                next();
            }else{
                //Non admins are not allowed to perform these actions
                return res.status(403).send({
                    message: 'Usuario no autorizado'
                })
            }
        }
    },
    verificarVendedor: async(req, res, next) => {
        if(!req.headers.token){
            return res.status(404).send({
                message: 'Token no encontrado'
            });
        }else{
            const validationResponse = await tokenServices.decode(req.headers.token);
            if(validationResponse.rol === 'Administrador' || validationResponse.rol === 'Vendedor'){
                next();
            }else{
                //Non admins are not allowed to perform these actions
                return res.status(403).send({
                    message: 'Usuario no autorizado'
                })
            }
        }
    }
}