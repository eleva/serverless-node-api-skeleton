'use strict';
import {utils} from "my-api-utils";
import {User} from "queries";

const dbClient = await utils.getDbClient();

export const handler = async (event) => {

    /* Get userId from path params */
    const userId = event.pathParameters?.id;
    const email = utils.parseBody(event.body)?.email;

    let response;
    let statusCode;

    if (email) {
        // Run query to update user
        const query = User.update(email, userId);
        let results = await dbClient.query(query.sql, query.values);
        response = {'id': parseInt(userId), 'email': email};
        statusCode = 200;
    } else {
        response = {'message': 'Missing email in request body'};
        statusCode = 400;
    }

    // Run mysql clean up function
    await dbClient.end();

    // Return prepared response
    return utils.prepareResponse(response, statusCode);
};
