exports.calculateScore = (lat, long, targetLat, targetLong) => {
  degrees_to_radians = degrees => {
    const pi = Math.PI;
    return degrees * (pi / 180);
  };

  calcdistance = (lat, long, targetLat, targetLong) => {
    const R = 6371e3;
    const z = degrees_to_radians(lat);
    const y = degrees_to_radians(targetLat);
    const x = degrees_to_radians(targetLat - lat);
    const w = degrees_to_radians(targetLong - long);

    const a =
      Math.sin(x / 2) * Math.sin(x / 2) +
      Math.cos(z) * Math.cos(y) * Math.sin(w / 2) * Math.sin(w / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d / 1000;
  };
  if (typeof lat !== "number" || typeof long !== "number") return 0;
  else return 20000 - calcdistance(lat, long, targetLat, targetLong);
};
