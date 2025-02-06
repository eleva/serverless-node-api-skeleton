'use strict';
import dotenv from "dotenv"
dotenv.config({'path':'.env.test'})
import {utils} from "my-api-utils";
const dbClient = await utils.getDbClient();

const tearDown = async () => {
    await dbClient.end();
};

export default tearDown;
