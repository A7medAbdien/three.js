# Three.js Journey

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

# Controls

1. DeviceOrientation: with moving the device, iOS is no longer supported
2. Pointer lock: no mouse, move with keyboard
3. Orbit: with limits
4. TrackBall: loop over the objects

# Geometry

no `Geometry` anymore, [link](https://stackoverflow.com/questions/68000359/three-geometry-is-not-a-constructor)

# BufferGeometry

1. BufferGeometry
2. Float32Array, size = count * no. Vertices * 3, in our example it was a triangle so no. of vertices was 3
3. ArrayAttribute