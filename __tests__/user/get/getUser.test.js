'use strict';
import * as path from 'path';
import { fileURLToPath } from 'url';

import {handler} from '../../../src/function/user/get/index.mjs';

// Import jestOpenApi plugin
import jestOpenAPI from 'jest-openapi';
// Load an OpenAPI file (YAML or JSON) into this plugin
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let relativePath = (__dirname).split("/__tests__/")[0];
let absolutePath = path.resolve(relativePath);
jestOpenAPI.default(absolutePath+'/doc/build/openapi.json');

describe('getUser', () => {
  beforeAll((done) => {
  //lambdaWrapper.init(liveFunction); // Run the deployed lambda
    done();
  });

  it('Test get user', () => {
    //Get user list calling get
    return handler({}).then((response) => {
      //Expect response to be defined
      expect(response).toBeDefined();
      //Validate status
      expect(response.statusCode).toEqual(200);
      //Validate response against UserListResponse Schema
      expect(JSON.parse(response.body)).toSatisfySchemaInApiSpec("UserListResponse");
    });
  });
});
