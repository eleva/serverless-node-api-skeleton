'use strict';
import {utils} from "my-api-utils";

export const handler = async (event) => {
    return utils.prepareResponse(
        {
            message: 'Go Serverless v3.0! Your function executed successfully!',
            input: event,
        }
        ,200
    );
};
