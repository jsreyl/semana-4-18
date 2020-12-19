const bcrypt = require('bcryptjs'); //For encryption
const db = require('../models'); // Info in our database

exports.add = async (req, res, next)=>{
    try {
        //First check if there's already an existing user with the email we're passing in the request body
        const registro = await db.Articulo.findOne({where: {codigo: req.body.codigo}});
        if (registro){
            res.status(409).send({
                message: 'An article with the given code already exists'
            })
        }else{
            const registro = await db.Articulo.create(req.body);
            res.status(200).json(registro);
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
        // const registro = await db.Articulo.findAll();//Get averything from the database
        const registro = await db.Articulo.findAll({
            include:[{
                model: db.Categoria,
                as: 'categoria',
                required: true,
                attributes: ["nombre"]
            },]
        });//Get averything from the database
        if(registro){
            res.status(200).json(registro); //200='ok' response, parse as json so it can be consumed    
        }else{
            res.status(404).send({
                message: 'There\'s no such category in the system'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error!'
        })
    }
}

exports.update = async (req, res, next)=>{
    try {
        const registro = await db.Articulo.findOne({where: {id: req.body.id}});
        if (registro){
            const registro = await db.Articulo.update({nombre: req.body.nombre, descripcion: req.body.descripcion, codigo: req.body.codigo},{
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(registro);
        }else{
            res.status(404).send({
                message: 'Article not found'
            })
        }
    } catch (error) {
        res.status(500).send({message:'Error'})       
    }
}

exports.activate = async (req, res, next)=>{
    try {
        const registro = await db.Articulo.findOne({where: {id: req.body.id}});
        if (registro){
            const registro = await db.Articulo.update({estado: 1},{
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(registro);
        }else{
            res.status(404).send({
                message: 'Article not found'
            })
        }
    } catch (error) {
        res.status(500).send({message:'Error'})       
    }
}

exports.deactivate = async (req, res, next)=>{
    try {
        const registro = await db.Articulo.findOne({where: {id: req.body.id}});
        if (registro){
            const registro = await db.Articulo.update({estado: 0},{
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(registro);
        }else{
            res.status(404).send({
                message: 'Article not found'
            })
        }
    } catch (error) {
        res.status(500).send({message:'Error'})       
    }
}