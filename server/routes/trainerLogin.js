const router = require('express').Router();
const {Trainer} = require('../models/Trainer');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const mongoose = require('mongoose'); 


router.post('/', async(req, res) => {
    try {
        // const { userName, password } = req.body;
        // console.log("try is hitting")
        // const {error} = validate(req.body)
        // if(error)
        // return res.status(400).send({message: error.details[0].message});
        // console.log("before trainer search")
        // console.log(userName)
        const trainer = await Trainer.findOne({userName: req.body.userName})
        if(!trainer) {
            return res.status(401).send({message:"Trainer not found!"})
        }
        // console.log(2222222)
        // console.log(req.body.password)
        console.log("before validate password");
        
        // const validPassword = bcrypt.compareSync(req.body.password, user.password);

        if(!bcrypt.compareSync(req.body.password, trainer.password)) {
            console.log("password failed")
            return res.status(401).send({message:"Password is not valid!"})
        }
        console.log('Password successful')
        res.status(200).send({message: "Logged in successfully!"})
    } catch(error) {
        res.status(500).send({message:"Internal server error"})
    }
});

const validate = (data) => {
    const schema = Joi.object({
        userName: Joi.string().userName().required().label("userName"),
        password: Joi.string().required().label("password"),
    });
    return schema.validate(data);
};

module.exports = router; 