'use strict';
import {utils} from "my-api-utils";
import {User} from "queries";

const dbClient = await utils.getDbClient();

export const handler = async (event) => {

    /* Get email from body */
    const email = utils.parseBody(event.body)?.email;

    let response;
    let statusCode;

    if (email) {
        // Run query to insert user
        const query = User.add(email);
        let results = await dbClient.query(query.sql, query.values);
        let insertId = results.insertId;
        response = {'id': insertId, 'email': email};
        statusCode = 200;
    } else {
        response = {'message': 'Missing email in request body'}
        statusCode = 400;
    }

    // Run mysql clean up function
    await dbClient.end();

    // Return prepared response
    return utils.prepareResponse(response, statusCode);

};
