
const fs = require('fs').promises;


async function readData(filename) {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return JSON.parse(data);
  } catch(err) {
    console.error(err);
  }
}

module.exports = { readData };


