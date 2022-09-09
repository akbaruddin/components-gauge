import { useRef, useEffect } from "react";

const useGaugeWindow = () => {
  // animation frame
  const requestAnimationFrame = useRef(
    window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (cb) {
        return setTimeout(cb, 1000 / 60);
      }
  );

  useEffect(() => {
    requestAnimationFrame.current =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (cb) {
        return setTimeout(cb, 1000 / 60);
      };
  }, []);

  return {
    requestAnimationFrame: requestAnimationFrame.current,
  };
};

export default useGaugeWindow;
