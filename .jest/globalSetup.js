'use strict';
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
require("dotenv").config({'path':'.env.test'})

const mysql = require('serverless-mysql')({
    library: require('mysql2'), //reference mysql2 for faster driver and support mysql8
    config: { //load config
        host     : process.env.DB_HOST, //host from env file
        database : process.env.DB_DATABASE, //db from env file
        user     : process.env.DB_USERNAME, //user from env file
        password : process.env.DB_PASSWORD //pass from env file
    }
})

module.exports = async () => {
    // disable constraints foreign key
    await mysql.query("SET FOREIGN_KEY_CHECKS=0;");

    //delete from db
    const truncateUser = "TRUNCATE user";
    const truncateUserResponse = await mysql.query(truncateUser);

};
