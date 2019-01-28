import regeneratorRuntime from "regenerator-runtime";
/**
 * @param {*} atlas 
 * @param {*} model An object that must have the following properties:
 *                  x: x position
 *                  y: y position 
 *                  w: width
 *                  h: height
 */
function PlayerDisplay( atlas, model ) {
    var framePositions = [];
    var fw, fh;
    // Create prescaled buffer
    var prescaled = document.createElement('canvas').getContext("2d");
    // Load the image
    var svg = new Image();
    svg.src = atlas.file;
    svg.onload = function (){
        svg.width =  Math.floor(svg.naturalWidth * atlas.scale);
        svg.height = Math.floor(svg.naturalHeight * atlas.scale);

        prescaled.canvas.width = Math.floor(svg.naturalWidth * atlas.scale);
        prescaled.canvas.height = Math.floor(svg.naturalHeight * atlas.scale);
    
        prescaled.drawImage(svg, 0, 0, svg.naturalWidth, svg.naturalHeight, 
            0, 0, prescaled.canvas.width, prescaled.canvas.height);
    
        
        if (atlas.frameWidth && atlas.frameHeight) {
            fw = Math.floor(atlas.frameWidth * atlas.scale);
            fh = Math.floor(atlas.frameHeight * atlas.scale);
            for (let i=0; i < atlas.frames.length; i++) {
                let frame = atlas.frames[i];
                framePositions[i] = { 
                    x: frame[1] * fw,
                    y: frame[0] * fh,
                   /*  w: (frame[1] + 1) * fw,   
                    h: (frame[0] + 1) * fh, */
                };
            }
        } else {
            // Assume the frames array is a collection of {top, left, bottom, right} bounding boxes
        }
    }

    function *frameGenerator() {
        var i = 0, 
            frameStep = 0,
            frame = framePositions[0];

        while (frame) {
            if( frameStep % atlas.frameStep == 0) {
                frame = framePositions[ i++ % framePositions.length ];
            }
            frameStep++;
            yield frame;
        }
    }

    var getFrame = frameGenerator();
    
    return {
        render(buffer) {  
            
            var frame = getFrame.next().value;
            // Draw directly to the canvas instead of using the buffer
            buffer.drawImage(prescaled.canvas, frame.x, frame.y, fw, fh, model.x, model.y,    
                fw, fh );
        }
    }
}

export default PlayerDisplay;
