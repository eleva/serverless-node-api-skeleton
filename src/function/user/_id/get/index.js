'use strict';
import {utils} from "my-api-utils";
const dbClient = await utils.getDbClient();

export const handler = async (event) => {

    /* Get userId from path params */
    const userId = event.pathParameters?.id;

    // Run query to get all users
    const query = "SELECT * FROM user WHERE id= ?";
    let results = await dbClient.query(query,userId);

    // Run mysql clean up function
    await dbClient.end();

    let response = results.length>0?results[0]:{};
    // Return prepared response
    return utils.prepareResponse(response,200);
};
