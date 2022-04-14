import app from './app';
import { createServer } from "http";
import dotenv from 'dotenv';
dotenv.config();

const httpServer = createServer(app);
const PORT = 8080;

try {
    httpServer.listen(process.env.PORT || PORT, (): void => {
        console.log(`Connected successfully on port ${PORT}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}