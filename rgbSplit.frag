precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D uTexture;

uniform vec2 uOffset;
uniform vec2 middle;

void main() {

  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  vec2 nuv = vec2(uv.x+(.0001*(distance(middle.x/10.0, uv.x))), uv.y);


  vec4 red = texture2D(uTexture, uv - uOffset);
  //vec4 red = texture2D(uTexture, nuv);
  vec4 green = texture2D(uTexture, uv);
  vec4 blue = texture2D(uTexture, uv - 1.7*uOffset);
  //vec4 blue = texture2D(uTexture, nuv);

  vec4 color = vec4(red.r, green.g, blue.b, 1.0);

  // Send the color to the screen
  gl_FragColor = color;

}
