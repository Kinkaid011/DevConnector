const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route       POST api/users
// @description Register user
// @access      Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    //This check function is using two parameters, the propery its checking and then a custom error message
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        //in this case we used return so the function stops right at the error
    }

    const { name, email, password } = req.body;
    //This is saying the "value" of name, email, password = req.body

    try {
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ errors: [ { msg: 'User already exist' } ]});
        }
        //// See if user exists (for registration)

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        });
        ////Get users gravatar

        const salt = await bcrypt.genSalt(10);
        //salt does the hashing, Password Hashing. ... Hashing performs a one-way transformation on a password, turning the password into another String. Salting is unique data added to the instance when the password is being inputted to give extra security.

        user.password = await bcrypt.hash(password, salt);
        //creates a hash

        //// Encrypt password using bcrypt

        await user.save(); 

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            //this is the id
            config.get('jwtToken'),
            //the security clearance
            { expiresIn: 36000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
                //give the token(which is just a parameter) back to client to use
            });
        //// Return jsonwebtoken
        
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

    

    
});


module.exports = router;