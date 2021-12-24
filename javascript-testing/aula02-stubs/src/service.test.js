const Service = require('./service');
const sinon = require('sinon');
const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alderann: require('./mocks/alderaan.json'),
};
const { deepStrictEqual } = require('assert');

const BASE_URL_1 = 'https://swapi.dev/api/planets/1';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2';

(async () => {

  // Comando para jogar o output de um arquivo para outro -> node service.test.js > mocks/tatooine.json

  // O sinon substitui o funcionamento de uma função por outra.

  const service = new Service();

  const stub = sinon.stub(service, service.makeRequest.name);

  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.tatooine);

  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.alderann);

  {
    
    {
      const expected = {
        name: 'Tatooine',
        surfaceWater: '1',
        appearedIn: 5,
      }
      
      const result = await service.getPlanets(BASE_URL_1);

      deepStrictEqual(result, expected);
    }

    {
      const expected = {
        name: 'Alderaan',
        surfaceWater: '40',
        appearedIn: 2,
      }

      const result = await service.getPlanets(BASE_URL_2);

      deepStrictEqual(result, expected);
    }
  }
})();
