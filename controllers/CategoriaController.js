const bcrypt = require('bcryptjs'); //For encryption
const db = require('../models'); // Info in our database

exports.add = async (req, res, next)=>{
    try {
        //First check if there's already an existing user with the email we're passing in the request body
        const registro = await db.Categoria.findOne({where: {nombre: req.body.nombre}});
        if (registro){
            res.status(409).send({
                message: 'Category name already exists'
            })
        }else{
            const registro = await db.Categoria.create(req.body);
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
        const registro = await db.Categoria.findAll();//Get the name and description of every category in the table
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
        const registro = await db.Categoria.findOne({where: {id: req.body.id}});
        if (registro){
            const registro = await db.Categoria.update({nombre: req.body.nombre, descripcion: req.body.descripcion},{
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(registro);
        }else{
            res.status(404).send({
                message: 'Category not found'
            })
        }
    } catch (error) {
        res.status(500).send({message:'Error'})       
    }
}

exports.activate = async (req, res, next)=>{
    try {
        const registro = await db.Categoria.findOne({where: {id: req.body.id}});
        if (registro){
            const registro = await db.Categoria.update({estado: 1},{
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(registro);
        }else{
            res.status(404).send({
                message: 'Category not found'
            })
        }
    } catch (error) {
        res.status(500).send({message:'Error'})       
    }
}

exports.deactivate = async (req, res, next)=>{
    try {
        const registro = await db.Categoria.findOne({where: {id: req.body.id}});
        if (registro){
            const registro = await db.Categoria.update({estado: 0},{
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(registro);
        }else{
            res.status(404).send({
                message: 'Category not found'
            })
        }
    } catch (error) {
        res.status(500).send({message:'Error'})       
    }
}