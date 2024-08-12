import { BaseService } from "./base.service.ts";
import Friend from "../../models/friend.ts";
import { Op } from "sequelize";
import FriiendRequest from "../../models/request.ts";
export class FriendsService extends BaseService {
    async getFriends(req) {
        try {
            const requestQuery = req.query;
            const { user_id, target_id } = requestQuery;
            if (user_id && target_id) {
                const friend = await Friend.findOne({
                    where: {
                        [Op.or]: [
                            { [Op.and]: [{ user_a_id: user_id }, { user_b_id: target_id }] },
                            { [Op.and]: [{ user_a_id: target_id }, { user_b_id: user_id }] }
                        ]
                    },
                    include: {
                        all: true,
                        nested: true
                    }
                });
                if (friend) {
                    return this.response({ data: friend });
                }
                else {
                    return this.response({ data: null });
                }
            }
            else {
                return this.response({ status: false, statusCode: 400, data: "User ID, and Target ID are required" });
            }
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async getFriendsByUserId(req) {
        try {
            const { id } = req.params;
            const friends = await Friend.findAll({
                where: {
                    [Op.or]: [{ user_a_id: id }, { user_b_id: id }]
                },
                include: ["user_a", "user_b"]
            });
            const respectedFriends = JSON.parse(JSON.stringify(friends));
            respectedFriends.map((item) => {
                if (item.user_b_id === id) {
                    [item.user_a_id, item.user_b_id] = [item.user_b_id, item.user_a_id];
                    const tempVar = item.user_a;
                    item.user_a = item.user_b;
                    item.user_b = tempVar;
                }
            });
            return this.response({ data: respectedFriends });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async createFriendship(req) {
        try {
            const { id } = req.params;
            const requestOfThisFriend = await FriiendRequest.findOne({
                where: { id }
            });
            if (!requestOfThisFriend)
                return this.response({ status: false, statusCode: 404, data: "Request of this friend wasn't found" });
            const friend = await Friend.create({
                user_a_id: requestOfThisFriend.to_id,
                user_b_id: requestOfThisFriend.from_id,
            });
            requestOfThisFriend.status = "approved";
            requestOfThisFriend.save();
            const detailedFriend = await Friend.findOne({
                where: { id: friend.id },
                include: {
                    all: true,
                    nested: true
                }
            });
            return this.response({ data: detailedFriend });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async unfriend(req) {
        try {
            const { id } = req.params;
            const friend = await Friend.findOne({
                where: { id }
            });
            if (!friend)
                return this.response({ status: false, statusCode: 404, data: "Friend wasn't found" });
            friend.destroy();
            return this.response({ data: "Friend is successfully unfriended" });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
}
