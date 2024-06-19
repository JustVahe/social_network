const router = require("express").Router();
const { Op } = require("sequelize");
const { Request } = require("../../models/index");
const { request } = require("express");

router.get("/", async (request, response) => {

    try {

        const requests = await Request.findAll();

        return response.status(200).json(requests);

    } catch (error) {
        console.log(error);
        return response.status(200).json(error);
    }

})

router.post("/:id", async (request, response) => {

    try {

        const { id } = request.params;
        const { target_id } = request.body;

        const requests = await Request.findAll({
            where: {
                [Op.or]: [{ from_id: id }, { to_id: id }]
            }
        })

        const newRequest = requests.find(item => item.from_id === target_id)

        return response.status(200).json(newRequest);

    } catch (error) {
        console.log(error);
        return response.status(200).json(error);
    }

});

router.post("/", async (request, response) => {

    try {

        const { from_id, to_id } = request.body;

        const requestData = await Request.create({
            from_id, to_id
        });

        return response.status(200).json(requestData);

    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }

});

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const requestData = await Request.findOne({
            where: { id }
        });

        requestData.destroy();

        return response.status(200).json(requestData);

    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }

})

module.exports = router;