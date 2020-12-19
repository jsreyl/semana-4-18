//Middleware de autenticacion;
const tokenService = require('../services/token');

module.exports = {
    verifyUsuario: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        // console.log("VERIFY USUARIO RESPONSE START");
        // console.log(response);
        // console.log(response.rol);
        // console.log("VERIFY USUARIO RESPONSE END");
        if (response.rol == 'Administrador' || response.rol == 'Vendedor' || response.rol == 'Almacenero') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    verificarAdministrador: async(req, res, next) => {
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }else{
            const validationResponse = await tokenServices.decode(req.headers.token);
            if(validationResponse.rol == 'Administrador'){
                next();
            }else{
                //Non admins are not allowed to perform these actions
                return res.status(403).send({
                    message: 'No autorizado'
                })
            }
        }
    },
    verificarVendedor: async(req, res, next) => {
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }else{
            const validationResponse = await tokenServices.decode(req.headers.token);
            if(validationResponse.rol == 'Administrador' || validationResponse.rol == 'Vendedor'){
                next();
            }else{
                //Non admins are not allowed to perform these actions
                return res.status(403).send({
                    message: 'No autorizado'
                })
            }
        }
    }
}