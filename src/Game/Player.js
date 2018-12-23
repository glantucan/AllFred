
function Player(x = 100, y = 50) {
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
        update,
        get x() { return x},
        get y() { return y},
        get vx() { return vx},
        get vy() { return vy},
        get width() { return width},
        get height() { return height},
    }
  
}