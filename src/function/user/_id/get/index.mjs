'use strict';
import {utils} from "my-api-utils";
import {User} from "queries";

const dbClient = await utils.getDbClient();

export const handler = async (event) => {

    /* Get userId from path params */
    const userId = event.pathParameters?.id;

    // Run query to get all users
    const query = User.find(userId);
    let results = await dbClient.query(query.sql, query.values);

    // Run mysql clean up function
    await dbClient.end();

    let response = results.length > 0 ? results[0] : {'message': 'User has not been found'};
    let status = results.length > 0 ? 200 : 400
    // Return prepared response
    return utils.prepareResponse(response, status);
};
