import React from "react";

import Gauge from "./Gauge";
import "./style.css"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Gauge",
  component: Gauge,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    baseColor: { control: "color" },
    filledColor: { control: "color" },
    baseFill: { control: "color" },
    onEnd: { action: 'reached 100' }
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Gauge {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  animated: true,
  width: 200,
  height: 200,
  baseStroke: 2,
  filledStroke: 2.5,
  baseColor: "#eee",
  filledColor: "#666",
  textColor: "#000",
  radius: 40,
  showValue: true,
};

export const NoAnimation = Template.bind({});
NoAnimation.args = {
  animated: false,
  width: 200,
  height: 200,
  frame: 1
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  animated: true,
  width: 500,
  height: 500,
  frame: 1
};

export const Large = Template.bind({});
Large.args = {
  animated: true,
  width: 200,
  height: 200,
  frame: 1
};

export const Normal = Template.bind({});
Normal.args = {
  animated: true,
  width: 100,
  height: 100,
  frame: 1
};

export const Small = Template.bind({});
Small.args = {
  animated: true,
  width: 50,
  height: 50,
  frame: 1
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  animated: true,
  width: 25,
  height: 25,
  frame: 1
};

export const Half = Template.bind({});
Half.args = {
  animated: true,
  min: -50,
  max: 50,
  showValue: true,
  value: 50,
  gaugeColor: function (value) {
    if (value < -25) {
      return "#5ee432";
    } else if (value < 0) {
      return "#fffa50";
    } else if (value < 25) {
      return "#f7aa38";
    } else {
      return "#ef4655";
    }
  },
  baseStroke: 10,
  filledStroke: 13,
  baseColor: "#334455",
  filledColor: "orange",
  textColor: "#333",
  start: 180,
  end: 0,
  frame: 2
};

export const GaugeDesign = Template.bind({});
GaugeDesign.args = {
  max: 100,
  showValue: true,
  value: 0,
  baseStroke: 2,
  filledStroke: 5,
  baseColor: "#334455",
  filledColor: "#C9DE3C",
  textColor: "#C9DE3C",
  start: 135,
  end: 45,
  frame: 1.5
};

export const GaugeDesignWithText = Template.bind({});
GaugeDesignWithText.args = {
  max: 30000,
  showValue: true,
  value: 50,
  baseStroke: 10,
  filledStroke: 10,
  baseColor: "#334455",
  filledColor: "#F32450",
  textColor: "#F32450",
  textClass: "right-side",
  postfix: 'km/hr',
  postfixClass: 'right-side-post',
  start: 90,
  end: 0,
  frame: 2
};

export const GaugeDesignDown = Template.bind({});
GaugeDesignDown.args = {
  max: 200,
  showValue: true,
  value: 50,
  baseStroke: 5,
  filledStroke: 5,
  baseColor: "#334455",
  filledColor: "#F8774B",
  textColor: "#F8774B",
  filledStrokeDasharray: "25 1",
  start: 0,
  end: -180,
};

export const FullCircle = Template.bind({});
FullCircle.args = {
  max: 100,
  value: 100,
  baseStroke: 20,
  filledStroke: 20,
  baseColor: "#666",
  filledColor: "#333",
  start: -90,
  end: -90.001,
  width: 100,
  height: 100,
  onEnd: () => {
    console.log('Ended');
  },
  fullCircle: true,
  radius: 10
};

export const FullCircleSmall = Template.bind({});
FullCircleSmall.args = {
  max: 100,
  value: 100,
  baseStroke: 20,
  filledStroke: 20,
  baseColor: "#666",
  filledColor: "#333",
  start: -90,
  end: -90.001,
  width: 50,
  height: 50,
  onEnd: () => {
    console.log('Ended');
  },
  fullCircle: true,
  radius: 10
};

export const FullCircleBorder = Template.bind({});
FullCircleBorder.args = {
  max: 100,
  value: 100,
  baseStroke: 5,
  filledStroke: 5,
  baseColor: "transparent",
  baseFill: "rgba(204, 138, 40, 0.644)",
  filledColor: "#F8774B",
  start: -90,
  end: -90.001,
  label: function(value) {
    return Math.round(value * 100) / 100;
  },
  baseClass: 'small-little'
};


