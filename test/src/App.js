import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import Plot from 'react-plotly.js';
import * as THREE from 'three';

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

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current);
      // const svgElement = ref.current.querySelector('svg');
      // setSvg(svgElement.outerHTML);
    }
  }, [ref]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* <div ref={ref} style={{ display: 'none' }}> */}
      <Plot ref={ref} data={data} layout={layout} />
      {/* </div> */}
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {svg && (
          <Html scaleFactor={20}>
            <img
              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
              alt="Plotly Chart"
            />
          </Html>
        )}
      </Canvas>
    </div>
  );
};

// export default Chart3D;