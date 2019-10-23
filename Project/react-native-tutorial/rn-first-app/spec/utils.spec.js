const { expect } = require("chai");
const { calculateScore } = require("../utils/ScoreCalculator");

describe("scoreCalculator", () => {
  let targetLat;
  let targetLong;
  beforeEach(() => {
    targetLat = 53.4808;
    targetLong = 2.2426;
  });
  it("returns 0 when passed undefined for lat and long", () => {
    expect(
      calculateScore(undefined, undefined, targetLat, targetLong)
    ).to.equal(0);
  });
  it("returns distance from manchester to paris within 100 km ", () => {
    expect(calculateScore(48.8566, 2.3522, targetLat, targetLong)).to.be.within(
      20000 - 700,
      20000 - 500
    );
  });
  it("returns distance from manchester to argentina within 100 km ", () => {
    expect(
      calculateScore(-34.6037, -58.3816, targetLat, targetLong)
    ).to.be.within(20000 - 11400, 20000 - 11200);
  });
  it("returns distance from northpole to south pole within 100 km ", () => {
    expect(calculateScore(-90, 45, 90, -135)).to.be.within(
      20000 - 20115,
      20000 - 19915
    );
  });
});
