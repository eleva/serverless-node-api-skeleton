'use strict';
const utils = require('my-api-utils');

module.exports.handler = async (event) => {
  return utils.prepareResponse(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
      }
      ,200
  );
};
