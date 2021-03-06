const request = require("request");

function getUserInfo(id, callbackFunctonForUser) {
  const userUrl = "https://jsonplaceholder.typicode.com/users/" + id;

  request(userUrl, (error, response, body) => {
    if (error) {
      console.log("Connection error...");
      return;
    }

    if (response.statusCode != 200) {
      console.log("User not found... Status code:", response.statusCode);
      return;
    }

    const userInfo = JSON.parse(body);

    const user = {
      name: userInfo.name,
      lat: userInfo.address.geo.lat,
      lng: userInfo.address.geo.lng
    };

    console.log(user.name);
    console.log("Lat:", user.lat);
    console.log("Lng", user.lng);

    callbackFunctonForUser(user);
  });
}

module.exports = { getUserInfo };
