import getDialCoords from "./getDialCoords";

function pathString(gaugeDefaults: any, radius: number, startAngle: number, endAngle: number, largeArc?: number) {
  let coords = getDialCoords(radius, startAngle, endAngle, gaugeDefaults);
  let start = coords.start;
  let end = coords.end;
  let largeArcFlag = typeof largeArc === "undefined" ? 1 : largeArc;

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    1,
    end.x,
    end.y,
  ].join(" ");
}
export default pathString;
