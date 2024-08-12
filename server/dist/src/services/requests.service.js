import { BaseService } from "./base.service.ts";
import FriendRequest from "../../models/request.ts";
import { Op } from "sequelize";
export class RequestService extends BaseService {
    async getRequests(req) {
        try {
            const { toggle, status, user_id } = req.query;
            if (status) {
                if (toggle === "from_me") {
                    const requests = await FriendRequest.findAll({
                        where: { from_id: user_id, status },
                        include: ["from", "to"]
                    });
                    return this.response({ data: requests });
                }
                else if (toggle === "to_me") {
                    const requests = await FriendRequest.findAll({
                        where: { to_id: user_id, status },
                        include: ["from", "to"]
                    });
                    return this.response({ data: requests });
                }
                else if (user_id) {
                    const requests = await FriendRequest.findAll({
                        where: {
                            [Op.or]: [{ to_id: user_id }, { from_id: user_id }],
                            status
                        },
                        include: ["from", "to"]
                    });
                    return this.response({ data: requests });
                }
            }
            return this.response({ status: false, statusCode: 400, data: "Id is required" });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async getRequestsById(req) {
        try {
            const { id } = req.params;
            const { target_id } = req.query;
            const requests = await FriendRequest.findAll({
                where: {
                    [Op.or]: [{ from_id: id }, { to_id: id }]
                }
            });
            const newRequest = requests.find(item => {
                if (item.to_id === id) {
                    return item.from_id === target_id;
                }
                else {
                    return item.to_id === target_id;
                }
            });
            if (!newRequest) {
                return this.response({ data: null });
            }
            return this.response({ data: newRequest });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async createFriendReguest(req) {
        try {
            const { from_id, to_id } = req.body;
            const requestData = await FriendRequest.create({
                from_id, to_id
            });
            return this.response({ data: requestData });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async updateFriendReguest(req) {
        try {
            const { id } = req.params;
            const requestData = await FriendRequest.findOne({
                where: { id }
            });
            if (!requestData)
                return this.response({ status: false, statusCode: 404, data: "Request wasn't found" });
            requestData.status = "rejected";
            requestData.save();
            return this.response({ data: requestData });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async deleteFriendReguest(req) {
        try {
            const { id } = req.params;
            const requestData = await FriendRequest.findOne({
                where: { id }
            });
            if (!requestData)
                return this.response({ status: false, statusCode: 404, data: "Request wasn't found" });
            requestData.destroy();
            return this.response({ data: requestData });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
}
