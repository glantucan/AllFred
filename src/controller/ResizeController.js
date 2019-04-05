import fullscreenController from "./FullScreenController"
/**
 * Will send new scale factor to bth the model and the view. 
 *      
 *      Should take whether the game it's on full screen into account.
 * 
 * @param {Number} screenW Screen or game container width
 * @param {Number} screenH Screen or game container height
 */
function resize(canvas) {
    
    var height, width;
    if (fullscreenController.isOnFullScreen()) {
        width  = screen.width;
        height = screen.height;
    } else {
        width  = canvas.clientWidth;
        height = canvas.clientHeight;

        console.log(canvas);
    console.log(width, height);
    }
    // calculate scale factor

    // send it to the model

    // send it to the view

}



export default {resize};