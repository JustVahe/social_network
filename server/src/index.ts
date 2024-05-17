import express, {Express, Request, Response} from 'express';
import cors from "cors";
import { config } from 'dotenv';


config();

const app : Express = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
})








