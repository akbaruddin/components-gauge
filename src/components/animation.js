// EXPERIMENTAL!!
/**
 * Simplistic animation function for animating the gauge. That's all!
 * Options are:
 * {
 *  duration: 1,    // In seconds
 *  start: 0,       // The start value
 *  end: 100,       // The end value
 *  step: function, // REQUIRED! The step function that will be passed the value and does something
 *  easing: function // The easing function. Default is easeInOutCubic
 * }
 */
function Animation(options, requestAnimationFrame) {
  const duration = options.duration;
  let currentIteration = 1;
  const iterations = 60 * duration;
  const start = options.start || 0;
  const end = options.end;
  const change = end - start;
  const step = options.step;
  const easing =
    options.easing ||
    function easeInOutCubic(pos) {
      // https://github.com/danro/easing-js/blob/master/easing.js
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    };

  function animate() {
    var progress = currentIteration / iterations,
      value = change * easing(progress) + start;
    // console.log(progress + ", " + value);
    step(value, currentIteration);
    currentIteration += 1;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  // start!
  requestAnimationFrame(animate);
}

export default Animation;
