/**
 * @filter        Rectangle Pixelate
 * @description   Renders the image using a pattern of rectangle tiles in specific area. Tile colors
 *                are nearest-neighbor sampled from the centers of the tiles.
 * @param centerX The x coordinate of the pattern center.
 * @param centerY The y coordinate of the pattern center.
 * @param scale   The width of an individual tile, in pixels.
 */
function rectanglePixelate(centerX, centerY, scale, radius) {
    gl.hexagonalPixelate = gl.hexagonalPixelate || new Shader(null, '\
        uniform sampler2D texture;\
        uniform vec2 center;\
        uniform float scale;\
        uniform vec2 texSize;\
        varying vec2 texCoord;\
        uniform float startX;\
        uniform float startY;\
        uniform float endX;\
        uniform float endY;\
        void main() {\
            if(texCoord.x >= startX && texCoord.x <= endX && texCoord.y >= startY && texCoord.y <= endY){\
                vec2 tex = (texCoord * texSize - center) / scale;\
                \
                vec2 a = vec2(ceil(tex.x), ceil(tex.y));\
                vec2 choice = a*scale/texSize;\
                gl_FragColor = texture2D(texture, choice + center / texSize);\
            }\
            else{\
                gl_FragColor = texture2D(texture, texCoord);\
            }\
        }\
    ');

    simpleShader.call(this, gl.hexagonalPixelate, {
        center: [centerX, centerY],
        scale: scale,
        texSize: [this.width, this.height],
        startX: ( centerX - radius ) / this.width,
        startY: ( centerY - radius ) / this.height,
        endX: ( centerX + radius ) / this.width,
        endY: ( centerY + radius ) / this.height
    });

    return this;
}
