const express=require('express'),
      router=express.Router(),
      auth = require('../../middleware/auth');

//Item Model
const Item = require('../../models/item');

//@route GET api/items
//@desc Get All Items
//@access Public

router.get("/", (req, res) => {
    Item.find()
        .sort({date:-1})
        .then(items => res.json(items))
});

//@route POST api/items
//@desc Create A Post
//@access Private

router.post("/", auth,(req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item));
});

//@route DELETE api/items
//@desc delete A item
//@access Private

router.delete("/:id", auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});


module.exports = router;