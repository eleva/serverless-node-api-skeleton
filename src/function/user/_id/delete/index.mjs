'use strict';
import {utils} from "my-api-utils";
const dbClient = await utils.getDbClient();

export const handler = async (event) => {

    /* Get userId from path params */
    const userId = event.pathParameters?.id;

    // Run query to insert user
    const query = 'DELETE FROM user WHERE id=?';
    let results = await dbClient.query(query,userId);
    let response = {'id':parseInt(userId),'email':''};

    // Run mysql clean up function
    await dbClient.end();

    // Return prepared response
    return utils.prepareResponse(response,200);
};
