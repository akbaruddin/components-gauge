/**
 * Gets cartesian co-ordinates for a specified radius and angle (in degrees)
 * @param cx {Number} The center x co-ordinate
 * @param cy {Number} The center y co-ordinate
 * @param radius {Number} The radius of the circle
 * @param angle {Number} The angle in degrees
 * @return An object with x,y co-ordinates
 */
function getCartesian(cx: number, cy: number, radius: number, angle: number) {
  let rad = (angle * Math.PI) / 180;
  return {
    x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
    y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000,
  };
}

export default getCartesian;
