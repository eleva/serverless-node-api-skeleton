'use strict';
import dotenv from "dotenv"
dotenv.config({'path':'.env.test'})
import {utils} from "my-api-utils";

const tearDown = async () => {

    const dbClient = await utils.getDbClient();
    await dbClient.end();
};

export default tearDown;
