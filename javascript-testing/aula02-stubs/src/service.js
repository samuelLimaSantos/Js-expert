const https = require('https');

const BASE_URL = 'https://swapi.dev/api/planets/1';

class Service {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        response.on("data", data => resolve(JSON.parse(data)));
        response.on("error", reject);
      })
    })
  }

};

(async () => {
  const response = await new Service().makeRequest(BASE_URL);

  console.log(response);
})();
