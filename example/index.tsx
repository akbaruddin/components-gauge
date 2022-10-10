import React from "react";
import { createRoot } from 'react-dom/client';
import Gauge from "../src";

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <Gauge />
  </React.StrictMode>
);