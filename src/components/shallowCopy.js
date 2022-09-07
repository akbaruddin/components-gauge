import { slice } from "./utils";

function shallowCopy(/* source, ...targets*/) {
  let target = arguments[0];
  const sources = slice.call(arguments, 1);
  sources.forEach(function (s) {
    for (var k in s) {
      if (s.hasOwnProperty(k)) {
        target[k] = s[k];
      }
    }
  });
  return target;
}
export default shallowCopy;
