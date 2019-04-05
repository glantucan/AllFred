/* TODO:
    - Change buffer_w and buffer_h to w, h.  It's the intended width and height. It will be resized to that proportion if not enough room.
    - Remove the buffer? Now it's not needed?
    - Pass the canvas instead of the buffer to the display objects
*/

function Display(canvas, aspectRatio) {
    // allways maximize the canvas to te container size
    canvas.style.width = aspectRatio*100+'%';
    canvas.style.height= '100%';
    // ...then set the internal size to match
    canvas.width  = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.offsetHeight;

    var buffer = document.createElement('canvas').getContext("2d");

    var  w = 1920, h = 1080;
    buffer.canvas.width = w;
    buffer.canvas.height = h;

    var buffer_hw_ratio = h/w;

    var context = canvas.getContext('2d');
    var displayStack = new Map();

    // Using  a map for the display stack cause they are keyed and can be iterated in the order of insertion. If a more sophisticated system is needed (like changing childs order on runtime) a support array for the rendering order may be needed or perhaps a map rearranging utility

    function attachChild(name, child) {
        displayStack.set(name, child);
        return child;
    }
    function detachChild(name) {
        var child = displayStack.get(name);
        displayStack.delete(name);
        return child;
    }

    function onResize (ev) {
    //     var height = document.documentElement.clientHeight,//canvas.clientHeight,
    //         width  = document.documentElement.clientWidth;//canvas.clientWidth;
            
    //     var hw = height/width;
        
    //     if (hw > buffer_hw_ratio) {
    //         canvas.width = width;
    //         canvas.height = width * buffer_hw_ratio;
    //     } else {
    //         canvas.height = height;
    //         canvas.width =  height / buffer_hw_ratio;
    //     }
        
    //     render();
    }

    function render() {
        
        for (var [childName, child] of displayStack) {
            child.render(buffer);
        }
        // Pass the contents of the buffer to the display canvas
        context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, context.canvas.width, context.canvas.height);
    }
    

    return { attachChild, detachChild, onResize, render };
}

export default Display;