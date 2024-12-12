// in vec4 gl_FragCoord
// out vec4 gl_FragColor
uniform vec3 iResolution; // Viewport resolution (in pixels)
uniform float iTime; // Elapsed time in seconds

// https://iquilezles.org/articles/palettes/
vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);

    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    // Normalize coordinates to the range [-1, 1] through swizzling
    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    for (float i = 0.0; i < 5.0; i += 1.0) {
        // Repeat it over space
        uv = fract(1.5 * uv * tanh(iTime * 0.25)) - 0.5;

        // Calculate the distance from the center
        float d = length(uv) * exp(-length(uv0));

        // Scale d
        d = sin(d * 8. + iTime) / 8.;
        d = abs(d);
        d = pow(0.01 / d, 1.2);

        // Get a color from a palette
        vec3 color = palette(length(uv0) + i * 0.4 + iTime * 0.4);
        finalColor += color * d;
    }

    // Set the fragment color
    gl_FragColor = vec4(finalColor, 1.0);
}
