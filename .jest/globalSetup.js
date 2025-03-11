'use strict';
import dotenv from "dotenv"
dotenv.config({'path':'.env.test'})
import {utils} from "my-api-utils";

const setup = async () => {
    // disable constraints foreign key

    const dbClient = await utils.getDbClient();
    await dbClient.query("SET FOREIGN_KEY_CHECKS=0;");

    //delete from db
    const truncateUser = "TRUNCATE user";
    const truncateUserResponse = await dbClient.query(truncateUser);

    await dbClient.end();

};

export default setup;
