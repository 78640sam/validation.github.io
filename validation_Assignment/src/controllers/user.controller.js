const User = require("../models/user.model");

const { body, validationResult } = require("express-validator"); 

const express = require("express");


const router = express.Router();


router.post("/",
    body("first_name")
        .isLength({ min: 3, max:20 }).withMessage("Please Enter Valid first Name"),
       body("last_name").isLength({ min: 3, max: 10 }).withMessage("Please Enter Valid last Name"),

        body("email").isEmail().withMessage("Please Enter Valid Email Address"),

        body("age").isNumeric().isInt({min:1,max:100})
        .withMessage("Age should be between 1 and 100"),

        body("gender").isLength({ min:3}).isIn(["Male", "Female","Others"])
        .withMessage("Please Enter valid gender"),

        body("pincode").isLength(equals=6).withMessage("pincode should be exactly 6 numbers"),

    async (req, res) => {
         const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({data:errors.array()});
        }
        const user = await User.create(req.body);
        return res.status(201).json(user);

    });


router.get("/", async (req, res) => {

    try {
         const user = await user.find({})
            .lean().exec();
        return res.status(201).send(user);
    }
    catch (err) {
        res.status(500).json(err.message);
    }

});


module.exports = router; 