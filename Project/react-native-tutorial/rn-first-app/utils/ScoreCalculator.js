const { getDistance, getPreciseDistance } = require("geolib");

exports.calculateScore = (lat, long, targetLat, targetLong) => {
  if (typeof lat !== "number" || typeof long !== "number") return 0;
  else {
    const distanceInM = getDistance(
      { latitude: lat, longitude: long },
      {
        latitude: parseFloat(targetLat),
        longitude: parseFloat(targetLong)
      }
    );
    const distanceInKm = Math.round(distanceInM / 1000);
    return Math.round((1 / 401522) * Math.pow(distanceInKm - 20038, 2));
  }
};
