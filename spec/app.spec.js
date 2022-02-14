const { expect } = require('chai');
const request = require('supertest');
const app = require('../index.js');
const getValidEndpoints = require('./testutils.js');

const viewsDirectory = 'content';

const validEndpoints = getValidEndpoints(viewsDirectory);

describe('CMS endpoint testing:', () => {
	describe('Valid endpoint testing:', () => {
		for (let endPoint of validEndpoints) {
			it(`GET:200 sends a get request to the ${endPoint} url`, () => {
				return request(app)
					.get(endPoint)
					.expect(200)
					.then(response => {
						console.log(response.text);
					});
			});
		}
	});
});