import dotenv from 'dotenv';

dotenv.config();

export const ENV ={
    MONGO_URL : process.env.MONGO_URL || "",
}