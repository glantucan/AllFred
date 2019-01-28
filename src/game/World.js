import Player from './Player';
var world = {
    background_color: "rgba(40, 48, 56, 0.25)",
    friction: 0.9, 
    gravity: 3,
    // player: Player({
    //     x: 300, 
    //     y: 250, 
    //     w: 100, 
    //     h: 70
    // }),
    h: 2000,
    w: 1400,
    viewPort: {
        w:2000, 
        h:1400
    },
    collideObject: function(gameObject) {
        if (gameObject.x < 0) { 
            gameObject.x = 0; 
            gameObject.vx = 0; 
        } else if (gameObject.x + gameObject.w > this.w) { 
            gameObject.x = this.w - gameObject.w; 
            gameObject.vx = 0; 
        }
        if (gameObject.y < 0) { 
            gameObject.y = 0; 
            gameObject.vy = 0; 
        } else if (gameObject.y + gameObject.h > this.h) { 
            gameObject.jumping = false; 
            gameObject.y = this.h - gameObject.h; 
            gameObject.vy = 0
        }
    }, 
    update: function() {
        // this.player.velocity_y += this.gravity;
        // this.player.update();

        // this.player.velocity_x *= this.friction;
        // this.player.velocity_y *= this.friction;

        // this.collideObject(this.player);
    }
}

export default world;