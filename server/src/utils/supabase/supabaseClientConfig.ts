import { config as dotenvConfig } from "dotenv"; dotenvConfig();
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;
export const supabase = createClient(url as string, key as string);