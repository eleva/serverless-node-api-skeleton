'use strict';
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const path = require('path');
// tests for deleteUserById
// Generated by serverless-jest-plugin

const postMod = require('./../../../../src/function/user/post/index');
const delMod = require('./../../../../src/function/user/_id/delete/index');

const jestPlugin = require('serverless-jest-plugin');
const lambdaWrapper = jestPlugin.lambdaWrapper;
const postWrapped = lambdaWrapper.wrap(postMod, { handler: 'handler' });
const delWrapped = lambdaWrapper.wrap(delMod, { handler: 'handler' });

// Import jestOpenApi plugin
const jestOpenAPI = require('jest-openapi').default;
// Load an OpenAPI file (YAML or JSON) into this plugin
let relativePath = (jasmine.testPath).split("/__tests__/")[0];
let absolutePath = path.resolve(relativePath);
jestOpenAPI(absolutePath+'/doc/build/openapi.json');

describe('deleteUserById', () => {
  beforeAll((done) => {
    //lambdaWrapper.init(liveFunction); // Run the deployed lambda
    done();
  });

  it('Test delete by id', () => {

    //Define request
    let userRequest = {
      'email':'test'+Date.now()+'@eleva.it'
    };
    //Validate request against UserRequest schema
    expect(userRequest).toSatisfySchemaInApiSpec("UserRequest");

    //Create a user calling post
    return postWrapped.run({
      body:userRequest
    }).then((response) => {
      //Get user id
      const userId = JSON.parse(response.body).id;

      //Delete specific user calling delete
      return delWrapped.run({
        path: "/user/"+userId,
        pathParameters: {
          id: userId
        }
      }).then((response) => {
        //Expect response to be defined
        expect(response).toBeDefined();
        //Validate status
        expect(response.statusCode).toEqual(200);
        //Validate response against UserResponse schema
        expect(JSON.parse(response.body)).toSatisfySchemaInApiSpec("UserResponse");
      });
    });

  });

});
