import Player from './Player';

function Game() {

    var world = {
        background_color: "rgba(40, 48, 56, 0.25)",
        friction: 0.9, 
        gravity: 3,
        player: Player(),
        height: 73,
        width: 128,
        collideObject: function(object) {
            if (object.x < 0) { 
                object.x = 0; object.velocity_x = 0; 
            } else if (object.x + object.width > this.width) { 
                object.x = this.width - object.width; object.vx = 0; 
            }
            if (object.y < 0) { 
                object.y = 0; object.velocity_y = 0; 
            } else if (object.y + object.height > this.height) { 
                object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0
            }
        }, 
        update: function() {
            this.player.velocity_y += this.gravity;
            this.player.update();

            this.player.velocity_x *= this.friction;
            this.player.velocity_y *= this.friction;

            this.collideObject(this.player);
        }
    }

    function update (){
        world.update();
    }

    return {
        update,
        get world() {
            return world;
        }
    }
}

export default Game;