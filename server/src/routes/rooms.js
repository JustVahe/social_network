const router = require("express").Router();
const { Op } = require("sequelize");
const { Room, Connection } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const { user_id, target_id } = request.query;

        if (user_id && target_id) {
            const room = await Room.findOne({
                include: {
                    all: true
                },
                where: {
                    [Op.or]: [{ user_a_id: user_id }, { user_b_id: user_id }],
                    [Op.or]: [{ user_a_id: target_id }, { user_b_id: target_id }]
                }
            });

            if (room) {
                const modifiedRoom = JSON.parse(JSON.stringify(room));

                if (modifiedRoom.user_b_id === user_id) {

                    const tempVar = modifiedRoom.user_a;
                    modifiedRoom.user_a = modifiedRoom.user_b;
                    modifiedRoom.user_b = tempVar;

                    [modifiedRoom.user_a_id, modifiedRoom.user_b_id] = [modifiedRoom.user_b_id, modifiedRoom.user_a_id];

                }

                return response.status(200).json(modifiedRoom);
            } else {
                return response.status(200).json(room);
            }

        } else if (user_id) {

            const rooms = await Room.findAll({
                include: {
                    all: true
                },
                where: {
                    [Op.or]: [{ user_a_id: user_id }, { user_b_id: user_id }]
                }
            });

            const chats = await Connection.findAll({
                include: {
                    all: true,
                    nested: true
                },
                where: { user_id }
            });

            const modifiedRooms = [...JSON.parse(JSON.stringify(rooms)), ...JSON.parse(JSON.stringify(chats))];

            modifiedRooms.forEach(item => {

                if (item.user_b_id && item.user_b_id === user_id) {
                    const tempVar = item.user_a;
                    item.user_a = item.user_b;
                    item.user_b = tempVar;
                    [item.user_a_id, item.user_b_id] = [item.user_b_id, item.user_a_id];
                }

            });

            return response.status(200).json(modifiedRooms);

        } else {
            return response.status(200).json("At least user id is required");
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

router.post("/", async (request, response) => {

    try {

        const { user_a_id, user_b_id } = request.body;
        const room = await Room.create({ user_a_id, user_b_id });

        const newRoom = await Room.findOne({ where: { id: room.id }, include: { all: true } });
        return response.status(200).json(newRoom);

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

router.get("/:id", async (request, response) => {

    try {

        const { id } = request.params;
        const room = await Room.findOne({
            where: { id },
            include: {
                all: true,
                nested: true
            }
        });

        const connection = await Connection.findOne({
            where: { id },
            include: {
                all: true,
                nested: true
            }
        });

        if (room) return response.status(200).json(room);
        if (connection) return response.status(200).json(connection);


    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;
        const room = await Room.findOne({
            where: { id }
        });

        room.destroy();
        return response.status(200).json(`Chat successfully deleted`);

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});


module.exports = router;