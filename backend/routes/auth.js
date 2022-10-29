const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'ramveerChauhan'

//Route1: Create a user using post "/api/auth/creatuser" 
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
        res.status(500).send("Internal server error");
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


//Route2 Authenticate a user using post "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password can\'t blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({messaage: "please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({ messaage: "please try to login with correct credentials" }) 
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)

        res.json({ authToken })
    } catch (error) {
        console.log(error.messaage)
        res.status(500).send("Internal server error");
    }
})

//Route3: Get logged in user details using post "api/auth/getUser". login required
router.post('/getUser', fetchuser,async (req, res) => {
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.log(error.messaage);
    res.status(500).send("Internal server error")
} 
})

module.exports = router