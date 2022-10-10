# Component Gauge

Simple React Component to create Gauge.

![npm bundle size](https://img.shields.io/bundlephobia/minzip/components-gauge?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/components-gauge?style=for-the-badge)
![npm](https://img.shields.io/npm/v/components-gauge?style=for-the-badge)
![npm](https://img.shields.io/npm/dw/components-gauge?style=for-the-badge)

Demo: <https://akbaruddin.github.io/components-guage/>

```bash
# npm
npm i components-gauge --save

# yarn
yarn add components-gauge

# pnpm
pnpm i components-gauge
```

### Usage

```jsx
import React, { Component } from "react";
import Gauge from "components-gauge";

export default function App() {
  return (
    <Gauge
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
    />
  );
}
```

## Props

| Prop                 | Default              | Description                                                                                                      |
| -------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| animated             | true                 | Animation                                                                                                        |
| width                | 200                  | width of chart 200px                                                                                             |
| height               | 200                  | height of chart 200px                                                                                            |

## License

MIT Licensed.
