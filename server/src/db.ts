import {Pool} from "pg";

export const pool = new Pool({
    user: "postgres",
    password: "brob7894ty",
    host: "localhost",
    port: 5432,
    database: "winku"
});