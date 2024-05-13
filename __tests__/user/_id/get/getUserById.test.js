'use strict';
import * as path from 'path';
import { fileURLToPath } from 'url';

import {handler as postHandler} from './../../../../src/function/user/post/index';
import {handler as getHandler} from './../../../../src/function/user/_id/get/index';

// Import jestOpenApi plugin
import jestOpenAPI from 'jest-openapi';
// Load an OpenAPI file (YAML or JSON) into this plugin
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let relativePath = (__dirname).split("/__tests__/")[0];
let absolutePath = path.resolve(relativePath);
jestOpenAPI.default(absolutePath+'/doc/build/openapi.json');

describe('getUserById', () => {
  beforeAll((done) => {
    //lambdaWrapper.init(liveFunction); // Run the deployed lambda

    done();
  });

  it('Test get user by id if user does not exists', () => {

    //Get a specific user calling get
    return getHandler({
      path: "/user/1000000",
      pathParameters: {
        id: "1000000"
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

  it('Test get user by id if user exists', () => {

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
      //Get userId
      const userId = JSON.parse(response.body).id;

      //Get specific user by id calling get
      return getHandler({
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
