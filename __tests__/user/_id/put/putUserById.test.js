'use strict';
import * as path from 'path';
import { fileURLToPath } from 'url';

import {handler as postHandler} from './../../../../src/function/user/post/index';
import {handler as putHandler} from './../../../../src/function/user/_id/put/index';

// Import jestOpenApi plugin
import jestOpenAPI from 'jest-openapi';
// Load an OpenAPI file (YAML or JSON) into this plugin
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let relativePath = (__dirname).split("/__tests__/")[0];
let absolutePath = path.resolve(relativePath);
jestOpenAPI.default(absolutePath+'/doc/build/openapi.json');

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
    return postHandler({
      body:userRequest
    }).then((response) => {
      //Get user id
      const userId = JSON.parse(response.body).id;

      //Edit a user calling put
      return putHandler({
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
    return postHandler({
      body: userRequest
    }).then((response) => {
      //Get user id
      const userId = JSON.parse(response.body).id;

      //Edit a user calling put with empty body
      return putHandler({
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
