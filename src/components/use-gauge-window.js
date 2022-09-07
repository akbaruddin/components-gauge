import { useRef, useEffect } from "react";

const useGaugeWindow = () => {
  // window
  const windowRef = useRef(window);
  // document
  const documentRef = useRef(window.document);
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
    windowRef.current = window;
    documentRef.current = window.document;
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
    windowRef: windowRef.current,
    documentRef: documentRef.current,
    requestAnimationFrame: requestAnimationFrame.current,
  };
};

export default useGaugeWindow;
