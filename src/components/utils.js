// short of slice
export const slice = Array.prototype.slice;

/**
 * Translates percentage value to angle. e.g. If gauge span angle is 180deg, then 50%
 * will be 90deg
 */
export const getAngle = (percentage, gaugeSpanAngle) => (percentage * gaugeSpanAngle) / 100;

export const normalize = (value, min, limit) => {
  let val = Number(value);
  if(val > limit) return limit;
  if(val < min) return min;
  return val;
}

export const getValueInPercentage = (value, min, max) => {
  let newMax = max - min;
  let newVal = value - min;
  return 100 * newVal / newMax;
  // var absMin = Math.abs(min);
  // return 100 * (absMin + value) / (max + absMin);
}
