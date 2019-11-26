const request = require("request");
const fs = require("fs");

function getUserWeather(user) {
  const wetaherUrl =
    "https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=" +
    user.lat +
    "&lon=" +
    user.lng;

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

    const weatherInfo = JSON.parse(body);

    console.log(weatherInfo.main.temp);

    const dataToSave = { user: user.name, temp: weatherInfo.main.temp };
    console.log(dataToSave);

    fs.writeFile("./user_weather.json", JSON.stringify(dataToSave), error => {
      if (error) {
        console.log(error.message);
        return;
      }

      console.log("File saved!");
    });
  });
}

module.exports = { getUserWeather };
