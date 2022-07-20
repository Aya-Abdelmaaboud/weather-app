const request = require("request");

const forCast = (lat, long, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=3331d28cf18740e3bc972336220607&q=" +
    lat +
    "," +
    long;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("error has occured", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      console.log();
      callback(
        undefined,
        response.body.location.country + " -> " + response.body.current.temp_c
      );
    }
  });
};

module.exports = forCast;
