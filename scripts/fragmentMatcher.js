require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const prismicApi = process.env.PRISMIC_API_URL;
const prismicGraphqlApi = process.env.PRISMIC_GRAPHQL_API;

fetch(prismicApi)
.then((r) => r.json())
.then((data) => {
  const ref = data.refs.find((r) => r.id === 'master');
  if (!ref) return;

  fetch(`${prismicGraphqlApi}?query=%7B%0A%20%20__schema%20%7B%0A%20%20%20%20types%20%7B%0A%20%20%20%20%20%20possibleTypes%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20kind%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A`, {
    headers: {
      'prismic-ref': ref.ref,
    },
  })
    .then(result => result.json())
    .then((result) => {
      try {
        const filteredData = result.data.__schema.types.filter(
          (type) => type.possibleTypes !== null,
        );

        result.data.__schema.types = filteredData;

        const targetFile = path.join(process.cwd(), '.cache', 'prismic.fragments.json');

        fs.writeFile(targetFile, JSON.stringify(result.data), err => {
          if (err) {
            console.error('Error writing fragmentTypes file', err);
          } else {
            console.log('Fragment types successfully extracted!');
          }
        });
      } catch (err) {
        console.log('Could not fetch fragments', err);
      }
    });
});