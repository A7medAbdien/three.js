import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import Plot from 'react-plotly.js';
import * as THREE from 'three';
import * as Plotly from 'plotly.js';

export const App = () => {
  const [svg, setSvg] = useState(null);
  const ref = useRef();

  const data = [
    {
      type: 'scatter',
      x: [1, 2, 3],
      y: [2, 3, 4],
      mode: 'markers',
      marker: { color: 'red', size: 10 },
    },
  ];

  const layout = {
    width: 400,
    height: 300,
    margin: { t: 0, r: 0, b: 0, l: 0 },
  };

  Plotly.newPlot("graph", data, layout)
    .then(async (gd) => {
      await Plotly.downloadImage(gd, { format: "png" });
    })
    .then((dataURI) => {
      console.log(dataURI);
    });


  return (
    <div>
      <Plot
        data={data}
        layout={layout}
      />
      <div id="graph" style={{ display: "none" }}></div>
    </div>
  );
};

// export default Chart3D;