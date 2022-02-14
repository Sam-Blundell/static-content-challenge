const { expect } = require('chai');
const request = require('supertest');
const app = require('../index.js');

describe('server', () => {
	describe('/jobs', () => {
		it('GET:200 sends a get request to the /jobs url', () => {
			return request(app)
				.get('/jobs')
				.expect(200)
				.then(response => {
					console.log(response);
				});
		});
	});
});