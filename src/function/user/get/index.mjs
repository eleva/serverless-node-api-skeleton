'use strict';
import {utils} from "my-api-utils";
const dbClient = await utils.getDbClient();
import {User} from "queries";

export const handler = async (event) => {

    // Run query to get all users
    const query = User.get();
    let results = await dbClient.query(query.sql)

    // Run mysql clean up function
    await dbClient.end();

    // Return prepared response
    return utils.prepareResponse(results,200);
};
