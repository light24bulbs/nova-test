

const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

module.exports = async function downloadImage() {
  const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
  const path = Path.resolve(__dirname, 'images', 'code.jpg');

  // axios image download with response type "stream"
  const response = await Axios({
    method: 'GET',
    url,
    responseType: 'stream',
  });

  // pipe the result stream into a file on disc
  response.data.pipe(Fs.createWriteStream(path));

  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve();
    });

    response.data.on('error', () => {
      reject();
    });
  });
};
