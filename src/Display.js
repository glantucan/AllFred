
function Display(canvas) {
    var buffer = document.createElement('canvas').getContext("2d");
    var context = canvas.getContext('2d');

    function onResize (ev) {
        var height, width;

        height = document.documentElement.clientHeight;
        width  = document.documentElement.clientWidth;

        context.canvas.height = height - 32;
        context.canvas.width = width - 32;
        
        render();
    }
    
    // Just a demo function
    function setfillColor(color) {
        buffer.fillStyle = color;
        buffer.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);
    }

    function render() {
        // Pass the contents of the buffer to the display canvas
        context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, context.canvas.width, context.canvas.height);
    }
    

    return { onResize, setfillColor, render };
}

export default Display;