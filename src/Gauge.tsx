import { useEffect, useReducer, useRef, useState } from "react";
import Animation from "./animation";
import { normalize } from "./utils";
import pathString from "./pathString";
import { getAngle, getValueInPercentage } from "./utils";

const scaled = {
  transformOrigin: "center center",
  transform: "scale(2.5)",
};

const initState = {
  limit: 100,
  min: 0,
  oldValue: 0,
  value: 0,
  radius: 40,
  showValue: false,
  startAngle: -90,
  endAngle: -90.001,
  textClass: "value-text",
  valueLabelClass: null,
  baseClass: "dial",
  gaugeClass: "gauge",
  gaugeColor: () => null,
  viewBox: `0 0 100 100`,
  loaded: false,
  time: 10000,
};

const reducer = (state: any, action: any) => {
  if (action.type === "VALUE") {
    return {
      ...state,
      oldValue: state.value,
      value: action.payload,
    };
  }

  return state;
};

const Gauge = (props: any) => {
  const {
    animated = true,
    width = 200,
    height = 200,
    baseStroke = 2,
    filledStroke = 2.5,
    baseColor = "#eee",
    filledColor = "#666",
    textColor = "#999",
    radius = 40,
    label = (value: number) => Math.round(value * 100) / 100,
    time = 10000,
    showValue = false,
    min = 0,
    max = 100,
    gaugeColor = () => null,
    filledStrokeDasharray = "",
    start = -90,
    end = -90.001,
    textClass = "value-text",
    postfix = null,
    postfixClass = "post-fix",
    baseFill = "none",
    baseClass = "dial",
    filledClass = "value",
    onEnd = () => {},
    frame = 1,
    fullCircle = false,
  } = props;
  const [state, dispatch] = useReducer(reducer, {
    ...initState,
    radius,
    label,
    time,
    showValue,
    textColor,
    min,
    limit: max,
    gaugeColor,
    filledStrokeDasharray,
    startAngle: start < end ? end : start,
    endAngle: start < end ? start : end,
    textClass,
    postfix,
    postfixClass,
    baseFill,
    baseClass,
    filledClass,
  });
  const [text, setText] = useState(null);
  const gaugeContainer = useRef(null);
  const gaugeValueElem = useRef(null);
  const gaugeValuePath = useRef<SVGPathElement | null>(null);
  const timer: { current: NodeJS.Timeout | null } = useRef(null);
  const oldValueRef = useRef(0);
  const [base, setBase] = useState("");
  const [baseTop, setBaseTop] = useState("");

  const [gaugeDefaults] = useState({
    centerX: 50,
    centerY: 50,
  });

  const updateGauge = (theValue: number, frame?: any) => {
    const val = getValueInPercentage(theValue, state.min, state.limit);
    const angle = getAngle(
      val,
      360 - Math.abs(state.startAngle - state.endAngle)
    );
    // this is because we are using arc greater than 180deg
    let flag = angle <= 180 ? 0 : 1;
    if (state.showValue) {
      setText(state.label.call(state, theValue));
    }
    setBaseTop(
      pathString(
        gaugeDefaults,
        state.radius,
        state.startAngle,
        angle + state.startAngle,
        flag
      )
    );
  };

  const setGaugeColor = (value: number, duration: number) => {
    const c = state.gaugeColor.call(state, value);
    const dur = duration * 1000;
    const pathTransition = "stroke " + dur + "ms ease";
    // const textTransition = "fill " + dur + "ms ease";

    if (gaugeValuePath.current) {
      gaugeValuePath.current.style.stroke = c;
      gaugeValuePath.current.style["-webkit-transition" as any] = pathTransition;
      gaugeValuePath.current.style["-moz-transition" as any] = pathTransition;
      gaugeValuePath.current.style.transition = pathTransition;
    }
    // gaugeValueElem.current.style = [
    //   "fill: " + c,
    //   "-webkit-transition: " + textTransition,
    //   "-moz-transition: " + textTransition,
    //   "transition: " + textTransition,
    // ].join(";");
  };

  const setValue = (val: number) => {
    const newValue = normalize(val, state.min, state.limit);
    dispatch({ type: "VALUE", payload: newValue });
    if (state.gaugeColor) {
      setGaugeColor(newValue, 0);
    }
    updateGauge(newValue);
  };

  const setValueAnimated = (val: number, duration: number, callback = () => {}) => {
    const oldValue = oldValueRef.current;
    const newValue = normalize(val, state.min, state.limit);
    if (oldValue === newValue) {
      return;
    }

    if (state.gaugeColor) {
      setGaugeColor(newValue, duration);
    }
    Animation(
      {
        start: oldValue || 0,
        end: newValue,
        duration: duration || 1,
        step: (val: number, frame: number) => {
          updateGauge(val, frame);
        },
      }
    );
    dispatch({ type: "VALUE", payload: newValue });
    oldValueRef.current = newValue;
  };

  useEffect(() => {
    setBaseTop(
      pathString(
        gaugeDefaults,
        state.radius,
        state.startAngle,
        state.startAngle
      )
    );

    const angle = getAngle(
      100,
      360 - Math.abs(state.startAngle - state.endAngle)
    );
    const flag = angle <= 180 ? 0 : 1;
    if (fullCircle) {
      setBase("M 50 40 A 10 10 0 1 1 49.999 40");
    } else {
      setBase(
        pathString(
          gaugeDefaults,
          state.radius,
          state.startAngle,
          state.endAngle,
          flag
        )
      );
    }

    const totalTime = state.time / 1000;
    let endTime = 0;
    timer.current = setInterval(() => {
      if (endTime >= totalTime) {
        clearInterval(timer.current as NodeJS.Timeout);
        onEnd();
      } else {
        endTime += 1;
        let circleEnd = state.limit * (endTime / totalTime);
        if (fullCircle && circleEnd === state.limit) {
          circleEnd -= 0.001;
        }
        if (animated) {
          setValueAnimated(circleEnd, frame);
        } else {
          setValue(circleEnd);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer.current as NodeJS.Timeout);
    };
  }, []);

  return (
    <div ref={gaugeContainer} style={{ width: width, height: height }}>
      <svg
        viewBox={state.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={state.gaugeClass}
      >
        <path
          className={state.baseClass}
          fill={state.baseFill}
          stroke={baseColor}
          strokeWidth={baseStroke}
          d={base}
          style={fullCircle ? scaled : {}}
        />
        {state.showValue && (
          <g className="text-container">
            <text
              x={50}
              y={50}
              fill={state.textColor}
              className={state.textClass}
              fontSize="100%"
              fontFamily="sans-serif"
              fontWeight="normal"
              textAnchor="middle"
              alignmentBaseline="middle"
              dominantBaseline="central"
              ref={gaugeValueElem}
            >
              {text}
            </text>
            {state.postfix && (
              <text className={state.postfixClass}>{state.postfix}</text>
            )}
          </g>
        )}
        <path
          className={state.filledClass}
          fill="none"
          stroke={filledColor}
          strokeWidth={filledStroke}
          d={baseTop}
          ref={gaugeValuePath}
          strokeDasharray={state.filledStrokeDasharray}
          style={fullCircle ? scaled : {}}
        />
      </svg>
    </div>
  );
};

export default Gauge;
