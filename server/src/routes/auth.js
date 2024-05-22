const router = require("express").Router();
const { sequelize, User } = require("../../models/index");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")

router.post("/register", async (request, response) => {
    
    try {

        const { name, surname, email, password } = request.body;

        const user = await User.findOne({
            where : {email}
        });

        if (user) 
            return response.status(401).status("User already exists");

        const saltRound = 18;

        const salt = await bcrypt.genSalt(saltRound);
        const encryptedPassword = bcrypt.hash(password, salt);

        const newUser = await User.create({
            name, surname, email, encryptedPassword
        })

        const token = jwtGenerator(newUser.uuid);
        response.json({token});

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

router.post("/login", async (response, request) => {

    try {
        
    } catch (error) {
        return response.status(500).json(error);
    }

})

module.exports = router;