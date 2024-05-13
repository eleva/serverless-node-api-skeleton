'use strict';
import {utils} from "my-api-utils";
const dbClient = await utils.getDbClient();

export const handler = async (event) => {

    // Run query to get all users
    let results = await dbClient.query('SELECT * FROM user')

    // Run mysql clean up function
    await dbClient.end();

    // Return prepared response
    return utils.prepareResponse(results,200);
};
