uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;
attribute vec2 uv;

uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

// Max 8 Colours defined, could work with more just need to define more than 8 colours!

#define SEGMENTCOUNT 15
#define PI 3.14159265359

// http://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec4 colors[3] = vec4[]();

void main( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 nodePosition = iResolution.xy/2.0;
    
    vec2 fragPos = fragCoord.xy - nodePosition;
    vec2 normalFragPos = normalize(fragCoord.xy - nodePosition);
    
    float angleSegment = 2.0 * PI;
    angleSegment /= float(SEGMENTCOUNT);
    
    float angle = atan(normalFragPos.y, normalFragPos.x) + PI;
    
    int segmentId = int(angle / angleSegment);
    
    float hueShift = (float(segmentId) + (mod(float(segmentId),2.0) * 0.5 * float(segmentId))) / float(SEGMENTCOUNT);
    
    //vec4 segmentColor = colors[segmentId];
    vec4 segmentColor = vec4(hsv2rgb(vec3(hueShift, 1.0, 1.0)),1.0);
    
    float circle = step(length(fragPos), 100.0);
    fragColor = circle * segmentColor;
}