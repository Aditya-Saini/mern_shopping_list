const express=require('express'),
      router=express.Router();

//User Model
const User = require('../../models/user');

//@route POST api/users
//@desc Register new user
//@access Public

router.post("/", (req, res) => {
   res.send("Register");
});


module.exports = router;