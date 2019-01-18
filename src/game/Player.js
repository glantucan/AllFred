
function Player( 
        { x, y, width, height } = {
            x: 100, 
            y: 50, 
            width: 16, 
            height: 16
        },
        { vx, vy } = {
            vx: 0,
            vy: 0
        }
    ) 
{
    var color = '#ff0000';
    var height = 16;
    var jumping = true;
    var vx = 0;
    var vy = 0;
    var width = 16;

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
        get width() { return width; },
        get height() { return height; },
        get model() {
            return { 
                x: this.x, 
                y: this.y, 
                w: this.width,
                h: this.height,
                color: color,
            };
        }
    }
  
}

export default Player;