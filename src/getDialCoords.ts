import getCartesian from "./getCartesian";

// Returns start and end points for dial
// i.e. starts at 135deg ends at 45deg with large arc flag
// REMEMBER!! angle=0 starts on X axis and then increases clockwise
function getDialCoords(radius: number, startAngle: number, endAngle: number, gaugeDefaults: {
  centerX: number,
  centerY: number
}) {
  let cx = gaugeDefaults.centerX;
  let cy = gaugeDefaults.centerY;

  return {
    end: getCartesian(cx, cy, radius, endAngle),
    start: getCartesian(cx, cy, radius, startAngle),
  };
}

export default getDialCoords;
