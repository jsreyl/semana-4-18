const bcrypt = require('bcryptjs'); //For encryption
const db = require('../models'); // Info in our database
const tokenServices = require('../services/token')

exports.login = async (req, res, next)=>{
    try {
        const user = await db.Usuario.findOne({where: {email: req.body.email}});
        if(user){
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);//Confirm whether the non encrypted password inputed coincides with the encrypted data on the DB (model)
            if(passwordIsValid){
                //Gather the info from the model (database tables)
                const token = await tokenServices.encode(user);
                // res.status(200).send({
                //     auth: true,
                //     tokenReturn: token,
                // })
                res.status(200).json({user: user, tokenReturn: token});        
            }else{
                res.status(401).send({
                    auth: false,
                    tokenReturn: null,
                    reason: 'Invalid Password!'
                })
            }
        }else{
            res.status(404).send({
                message: 'User Not Found.'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Error -> '+ error
        })
        next(error);
    }
}

exports.register = async (req, res, next)=>{
    try {
        //First check if there's already an existing user with the email we're passing in the request body
        const user = await db.Usuario.findOne({where: {email: req.body.email}});
        if (user){
            res.status(409).send({
                message: 'Email already registered'
            })
        }else{
            // Encrypt the password using bcrypt
            req.body.password = bcrypt.hashSync(req.body.password, 10);// Password string and how many times to execute the encrypting algorithm
            const user = await db.Usuario.create(req.body);
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error'
        });
        next(error);        
    }
}

exports.list = async (req, res, next)=>{
    try {
        const user = await db.Usuario.findAll();//Get averything from the database
        if(user){
            res.status(200).json(user); //200='ok' response, parse as json so it can be consumed    
        }else{
            // Send 404
            res.status(404).send({
                message: 'No users on the database'
            })
        }
    } catch (error) {
        //Send 500 for errors
        res.status(500).send({
            message: 'Error'
        });
        next(error);        
    }
}

exports.update = async (req, res, next)=>{
    //Changes the stored name of a user registered by email
    try {
        const user = await db.Usuario.findOne({where: {email: req.body.email}});
        if (user){
            req.body.password = bcrypt.hashSync(req.body.password, 10);// Password string and how many times to execute the encrypting algorithm
            const user = await db.Usuario.update({nombre: req.body.nombre, rol: req.body.rol, password: req.body.password, estado: req.body.estado},{
                where: {
                    email: req.body.email
                },
            });
            res.status(200).json(user);
        }else{
            res.status(404).send({
                message: 'User not found'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error'
        });
        next(error);
    }
}

exports.activate = async (req, res, next)=>{
    try {
        const registro = await db.Usuario.findOne({where: {id: req.body.id}});
        if (registro){
            const registro = await db.Usuario.update({estado: 1},{
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(registro);
        }else{
            res.status(404).send({
                message: 'User not found'
            })
        }
    } catch (error) {
        res.status(500).send({message:'Error'})       
    }
}

exports.deactivate = async (req, res, next)=>{
    try {
        const registro = await db.Usuario.findOne({where: {id: req.body.id}});
        if (registro){
            const registro = await db.Categoria.update({estado: 0},{
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(registro);
        }else{
            res.status(404).send({
                message: 'User not found'
            })
        }
    } catch (error) {
        res.status(500).send({message:'Error'})       
    }
}