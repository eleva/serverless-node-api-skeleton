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

    /* Get email from body */
    const email = utils.parseBody(event.body)?.email;

    let response;
    let statusCode;

    if(email){
        // Run query to insert user
        const query = 'INSERT INTO user(email) VALUES (?)';
        let results = await mysql.query(query,email);
        let insertId = results.insertId;
        response = {'id':insertId,'email':email};
        statusCode = 200;
    } else {
        response = {'message':'Missing email in request body'}
        statusCode = 400;
    }

    // Run mysql clean up function
    await mysql.end();

    // Return prepared response
    return utils.prepareResponse(response,statusCode);

};
