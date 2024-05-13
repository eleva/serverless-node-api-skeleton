'use strict';
import {utils} from "my-api-utils";
const dbClient = await utils.getDbClient();

export const handler = async (event) => {

    /* Get userId from path params */
    const userId = event.pathParameters?.id;
    const email = utils.parseBody(event.body)?.email;

    let response;
    let statusCode;

    if(email){
        // Run query to update user
        let results = await dbClient.query('UPDATE user SET email=? WHERE id=?',[email,userId]);
        response = {'id':parseInt(userId),'email':email};
        statusCode = 200;
    } else {
        response = {'message':'Missing email in request body'};
        statusCode = 400;
    }

    // Run mysql clean up function
    await dbClient.end();

    // Return prepared response
    return utils.prepareResponse(response,statusCode);
};
