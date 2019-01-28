
function Player( 
        { x, y, w, h } = {
            x: 100, 
            y: 50, 
            w: 16, 
            h: 16
        },
        v = 3
    ) 
{
    var vx = 0, vy = 0; 
    var jumping = false;

    function jump() {
        jumping = true;
        vy -= 20;
    }

    function moveLeft() {
        vx = -v;
    }

    function moveRight() {
        vx = v;
    }

    function stopX() {
        vx = 0;
    }

    function moveUp() {
        vy = -v;
    }
    
    function moveDown() {
        vy = v;
    }

    function stopY() {
        vy = 0;
    }

    function update() {
        x += vx;
        y += vy;
        //console.log(x);
    }

    function screenResized(scale) {

    }

    return {
        update, moveLeft, moveRight, moveUp, moveDown, jump, stopX, stopY,
        get x() { return x;   console.log(x);},
        get y() { return y; },
        set x(val) { x = val; },
        set y(val) { y = val; },
        get vx() { return vx; },
        get vy() { return vy; },
        set vx(val) { vx = val; },
        set vy(val) { vy = val; },
        get width() { return w; },
        get height() { return h; },
        get model() {
            return { 
                get x() { return x;}, 
                get y() { return y; }, 
                get w() { return w; },
                get h() { return h; },
            };
        }
    }
  
}

export default Player;