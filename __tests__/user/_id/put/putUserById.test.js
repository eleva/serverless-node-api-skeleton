'use strict';
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const path = require('path');
// tests for putUserById
// Generated by serverless-jest-plugin

const postMod = require('./../../../../src/function/user/post/index');
const putMod = require('./../../../../src/function/user/_id/put/index');

const jestPlugin = require('serverless-jest-plugin');
const lambdaWrapper = jestPlugin.lambdaWrapper;
const postWrapped = lambdaWrapper.wrap(postMod, { handler: 'handler' });
const putWrapped = lambdaWrapper.wrap(putMod, { handler: 'handler' });


// Import jestOpenApi plugin
const jestOpenAPI = require('jest-openapi').default;
// Load an OpenAPI file (YAML or JSON) into this plugin
let relativePath = (jasmine.testPath).split("/__tests__/")[0];
let absolutePath = path.resolve(relativePath);
jestOpenAPI(absolutePath+'/doc/build/openapi.json');

describe('putUserById', () => {
  beforeAll((done) => {
    //lambdaWrapper.init(liveFunction); // Run the deployed lambda
    done();
  });

  it('Test put user by id', () => {

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

      //Edit a user calling put
      return putWrapped.run({
        path: "/user/"+userId,
        pathParameters: {
          id: +userId
        },
        body:userRequest
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


  it('Test put user by id without passing email', () => {

    //Define request
    let userRequest = {
      'email':'test'+Date.now()+'@eleva.it'
    };
    //Validate request against UserRequest schema
    expect(userRequest).toSatisfySchemaInApiSpec("UserRequest");

    //Create a user calling post
    return postWrapped.run({
      body: userRequest
    }).then((response) => {
      //Get user id
      const userId = JSON.parse(response.body).id;

      //Edit a user calling put with empty body
      return putWrapped.run({
        path: "/user/"+userId,
        pathParameters: {
          id: +userId
        },
        body:{}
      }).then((response) => {
        //Expect response to be defined
        expect(response).toBeDefined();
        //Validate status
        expect(response.statusCode).toEqual(400);
        //Validate response against BadRequestResponse
        expect(JSON.parse(response.body)).toSatisfySchemaInApiSpec("BadRequestResponse");
      });
    });

  });


});