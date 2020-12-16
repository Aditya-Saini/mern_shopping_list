const express=require('express'),
      router=express.Router(),
      bcrypt = require("bcryptjs"),
      config = require("config"),
      jwt = require("jsonwebtoken"),
      auth = require('../../middleware/auth');

//User Model
const User = require('../../models/user');

//@route POST api/auth
//@desc Auth user
//@access Public

router.post("/", (req, res) => {
   const { email, password } = req.body;

   //simple validation
   if( !email || !password) {
       return res.status(400).json({ msg: 'pleaase enter all fields' });
   }
   //check for existing user
   User.findOne({ email }).then(user => {
       if(!user)
            return res.status(400).json({ msg: 'User Does not exists' })
        
        //validating password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err;

                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        });
                    }
                )
            })
        
    })
});

//@route GET api/auth/user
//@desc Get user data
//@access Public

router.get("/user", auth, (req, res)=> {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            res.json(user);
        });
});

module.exports = router;