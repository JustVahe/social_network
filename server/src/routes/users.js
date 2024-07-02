const router = require("express").Router();
const { User } = require("../../models/index");
const multiparty = require("multiparty");

router.get("/", async (request, response) => {

    try {

        const { username, filter, value } = request.query;

        let users;

        if (username) {
            users = await User.findOne({
                include: {
                    all: true,
                    nested: true
                },
                where: { username }
            })
        } else if (filter && value) {

            const users = await User.findAll();

            if (filter === "name") {

                const newUsers = users.filter(item => {
                    const nameSurname = item.name + " " + item.surname;
                    return nameSurname.toLowerCase().startsWith(value);
                });

                return response.status(200).json(newUsers);

            }

        } else {
            users = await User.findAll();
        }

        return response.status(200).send(users);

    } catch (error) {

        console.log(error);
        return response.status(500).json("Internal Server Error - " + error.message);

    }

});

router.get("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const user = await User.findOne({
            where: { id },
            include: {
                all: true,
                nested: true,
            }
        });

        return response.status(200).json(user);

    } catch (error) {

        console.log(error);
        return response.status(500).json("Internal Server Error - " + error.message);

    }

});

router.put("/:id", async (request, response) => {

    try {

        const { id } = request.params;
        const form = new multiparty.Form();

        const user = await User.findOne({
            where: { id }
        });

        form.parse(request, (errors, fields, files) => {

            if (errors) {
                Object.keys(errors).forEach(item => {
                    if (errors) {
                        return response.status(500).json(errors);
                    }
                });
            }
            Object.keys(fields).forEach(item => {
                if (item) user[item] = fields[item][0];
            });
            user.save();

        });

        const newUser = await User.findOne({
            where: { id },
            include: {
                all: true,
                nested: true
            }
        });

        return response.status(200).json(newUser);

    } catch (error) {

        console.log(error);
        return response.status(500).json("Internal Server Error - " + error.message);

    }

});

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const user = await User.findOne({
            where: { id }
        });

        user.destroy();

        return response.status(200).json(`${user.name} is deleted`);

    } catch (error) {

        console.log(error);
        return response.status(500).json("Internal Server Error - " + error.message);

    }

});

module.exports = router;