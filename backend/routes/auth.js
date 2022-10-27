const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ramveerChauhan'

//Create a user using post "/api/auth/creatuser" 
router.post('/creatuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        //check wheather the user with this email exits already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "sorry a user with this email already exits" })
        }
       
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)

        res.json({authToken})
       
        //  res.json({ messaage: "congrats your account created...!", data: user })
    } catch (error) {
        console.log(error.messaage)
        res.status(500).send("some error occured");
    }
    // .then(user => res.json(user))
    //     .catch(err => {
    //         console.log(err)
    //         res.json({
    //             errors: "please enter a unique value for a email",
    //             message: err.message
    //         })
    //     })
})

module.exports = router