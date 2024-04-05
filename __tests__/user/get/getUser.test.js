'use strict';
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const path = require('path');
// tests for getUser
// Generated by serverless-jest-plugin
const mod = require('./../../../src/function/user/get/index');

const jestPlugin = require('serverless-jest-plugin');
const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrapped = lambdaWrapper.wrap(mod, { handler: 'handler' });

// Import jestOpenApi plugin
const jestOpenAPI = require('jest-openapi').default;
// Load an OpenAPI file (YAML or JSON) into this plugin
let relativePath = (jasmine.testPath).split("/__tests__/")[0];
let absolutePath = path.resolve(relativePath);
jestOpenAPI(absolutePath+'/doc/build/openapi.json');

describe('getUser', () => {
  beforeAll((done) => {
  //lambdaWrapper.init(liveFunction); // Run the deployed lambda
    done();
  });

  it('Test get user', () => {
    //Get user list calling get
    return wrapped.run({}).then((response) => {
      //Expect response to be defined
      expect(response).toBeDefined();
      //Validate status
      expect(response.statusCode).toEqual(200);
      //Validate response against UserListResponse Schema
      expect(JSON.parse(response.body)).toSatisfySchemaInApiSpec("UserListResponse");
    });
  });
});