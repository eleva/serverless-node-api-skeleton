'use strict';
import * as path from 'path';
import { fileURLToPath } from 'url';

import {handler} from '../../../src/function/user/post/index.mjs';

// Import jestOpenApi plugin
import jestOpenAPI from 'jest-openapi';
// Load an OpenAPI file (YAML or JSON) into this plugin
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let relativePath = (__dirname).split("/__tests__/")[0];
let absolutePath = path.resolve(relativePath);
jestOpenAPI.default(absolutePath+'/doc/build/openapi.json');

describe('postUser', () => {
  beforeAll((done) => {
    //lambdaWrapper.init(liveFunction); // Run the deployed lambda
    done();
  });

  it('Test post user', () => {

    //Define request
    let userRequest = {
      'email':'test'+Date.now()+'@eleva.it'
    };
    //Validate request
    expect(userRequest).toSatisfySchemaInApiSpec("UserRequest");

    //Create a user calling post
    return handler({
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

  it('Test post user without passing email', () => {

    //Create a user calling post, passing empty body
    return handler({
      body:{}
    }).then((response) => {
      //Expect response to be defined
      expect(response).toBeDefined();
      //Validate status
      expect(response.statusCode).toEqual(400);
      //Validate response against BadRequestResponse schema
      expect(JSON.parse(response.body)).toSatisfySchemaInApiSpec("BadRequestResponse");
    });
  });

});
