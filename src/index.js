import setupServer from "./server.js";
import { initMongoDB } from "./db/initMongoConnection.js";

async function bootCamp() {
    await initMongoDB();
    setupServer();
}

bootCamp();
