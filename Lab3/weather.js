const request = require("request");

function getUserWeather(lat, lng, callbackFunctionForWeather) {
  const wetaherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;

  request(wetaherUrl, (error, response, body) => {
    if (error) {
      console.log("Weather Serevr connection error...");
      return;
    }

    if (response.statusCode != 200) {
      console.log(
        "Weather data not found... Status code:",
        response.statusCode
      );
      return;
    }

    const weather = JSON.parse(body);

    console.log(weather.main.temp);

    callbackFunctionForWeather(weather);
  });
}

module.exports = { getUserWeather };
