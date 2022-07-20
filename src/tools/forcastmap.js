const request = require("request");

const forCastMap = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiZmFyYWgxMjMiLCJhIjoiY2tpb3ZrNnE4MDB0cjJ0cDlzZXZ5eHQ5dSJ9.F6mgRF14yRJ6WN9JqtpWtw";
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("errrrrrror", undefined);
    } else if (response.body.message) {
      callback(response.body.message, undefined);
    } else if (response.body.features.length === 0) {
      callback("Missing or invalid country", undefined);
    } else {
      callback(undefined, response.body.features[0].center);
    }
  });
};

module.exports = forCastMap;
