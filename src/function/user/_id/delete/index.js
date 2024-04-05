'use strict';
/*Import serverless mysql*/
const mysql = require('serverless-mysql')({
    library: require('mysql2'), //reference mysql2 for faster driver and support mysql8
    config: { //load config
        host     : process.env.DB_HOST, //host from env file
        database : process.env.DB_DATABASE, //db from env file
        user     : process.env.DB_USERNAME, //user from env file
        password : process.env.DB_PASSWORD //pass from env file
    }
})
/*Import utils from layers*/
const utils = require('my-api-utils');

module.exports.handler = async (event) => {

    /* Get userId from path params */
    const userId = event.pathParameters?.id;

    // Run query to insert user
    const query = 'DELETE FROM user WHERE id=?';
    let results = await mysql.query(query,userId);
    let response = {'id':parseInt(userId),'email':''};

    // Run mysql clean up function
    await mysql.end();

    // Return prepared response
    return utils.prepareResponse(response,200);
};
