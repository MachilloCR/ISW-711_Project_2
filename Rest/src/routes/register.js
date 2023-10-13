const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const UserModel = require('../Models/user');
const sendEmail = require("../services/email");

router.post('/user/verify', async (req, res) => {

    const user = new UserModel.model;

    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phone = req.body.phone;
    user.role_id = req.body.role_id;

    if (!user.first_name || !user.last_name || !user.email || !user.password || !user.phone) {

        res.status(400).json({ message: "Invalid credentials" });

    } else {
        //create the token whit all the user data
        const token = jwt.sign(
            {
                first_name: user.first_name, last_name: user.last_name, email: user.email,
                password: user.password, phone: user.phone, rol_id: user.role_id
            },
            process.env.MYSECRET
        );
        //sends the email whit all the user data
        const options = {
            from: "soursystemutn@gmail.com",
            to: user.email,
            subject: "Verify Account",
            text: `Here you go! Please here is your confirm account link: http://localhost:3000/ConfirmRegister?token=${token}`,
        };

        sendEmail(options, (info) => {
            console.log("Email sent successfully");
            console.log("MESSAGE ID: ", info.messageId);
        });

        //Session Created Succefully
        res.status(201).json({ msg: "Email sent successfully" });
    }
});

//Create New
router.post('/user', async (req, res) => {

    const user = new UserModel.model;

    jwt.verify(req.body.token, process.env.MYSECRET, (err, userVerified) => {
        if (err) {
            return res.status(403).json({ message: "Usuario invalido" });
        }
        req.user = user;
        user.first_name = userVerified.first_name;
        user.last_name = userVerified.last_name;
        user.email = userVerified.email;
        user.password = userVerified.password;
        user.phone = userVerified.phone;
        user.role_id = userVerified.rol_id;
    });
    console.log(user);

    //Verify empty spaces
    if (user.first_name && user.last_name && user.email && user.role_id) {

        // create the user 
        const userExists = await UserModel.model.findOne({ email: user.email });
        if (!userExists) {
            user.save(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the User', err);
                    res.json({
                        error: 'There was an error saving the User'
                    });
                }
                //User Created Succefully
                res.status(201);
                res.header({
                    'location': `http://localhost:8000/api/user/?id=${user.id}`
                });
                res.json(user);
            });
        } else {
            res.status(422);
            console.log('error while saving the User')
            res.json({
                error: 'This User already Exists'
            });
        }

    } else {
        res.status(422);
        console.log('error while saving the User')
        res.json({
            error: 'No valid data provided for User'
        });
    }
});




module.exports = router;