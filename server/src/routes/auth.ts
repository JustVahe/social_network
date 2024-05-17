import { Request, Response, Router} from "express";
import { IUser } from "../utils/types/types";

const router = Router();

router.post("/register", async (request: Request, response: Response) => {

    try {

        const { name, email, password, username } = request.body as IUser;

    } catch (error) {

    }

})