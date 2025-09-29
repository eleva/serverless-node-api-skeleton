'use strict';
import {utils} from "my-api-utils";
import {User} from "queries";

const dbClient = await utils.getDbClient();

export const handler = async (event) => {

    /* Get userId from path params */
    const userId = event.pathParameters?.id;

    // Run query to insert user
    const query = User.delete(userId);
    let results = await dbClient.query(query.sql, query.values);
    let response = {'id': parseInt(userId), 'email': ''};

    // Run mysql clean up function
    await dbClient.end();

    // Return prepared response
    return utils.prepareResponse(response, 200);
};
