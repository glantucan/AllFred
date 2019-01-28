
function Player( 
        { x, y, w, h } = {
            x: 100, 
            y: 50, 
            w: 16, 
            h: 16
        },
        { vx, vy } = {
            vx: 0,
            vy: 0
        }
    ) 
{
    var jumping = false;

    function jump() {
        jumping = true;
        vy -= 20;
    }

    function moveLeft() {
        vx -= 0.5;
    }

    function moveRight() {
        vy += 0.5;
    }

    function update() {
        x += vx;
        y += vy;
    }

    return {
        update, moveLeft, moveRight, jump,
        get x() { return x; },
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
                x: this.x, 
                y: this.y, 
                w: this.w,
                h: this.h,
            };
        }
    }
  
}

export default Player;