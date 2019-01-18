
/**
 * 
 * @param {*} model An object that must have the following properties:
 *                  x: x position
 *                  y: y position 
 *                  w: width
 *                  h: height
 */
function Square( model ) {

    return {
        render(buffer) {  
            buffer.fillStyle = model.color;
            buffer.fillRect(Math.floor(model.x), Math.floor(model.y), model.w, model.h);
        }
    }
}

export default Square;
